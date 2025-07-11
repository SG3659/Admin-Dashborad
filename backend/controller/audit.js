import prisma from "../config/dbconfig.js";

export const fetchAudit = async (req, res) => {
   const page=Number(req.query.page) || 1;
   const limit = Number(req.query.limit) || 10;
   if(page<=0) page=1;
   if(limit<=0 || limit>100) limit=10;

   const skip = (page - 1) * limit;
   try {
      const audits=await prisma.auditLog.findMany({
         skip,
         take:limit,
         orderBy: {
            id: 'desc',
         },
          include: {
        car: {
          select: {
            id: true,
            title: true,
            location: true,
            pricePerDay: true, // use correct field name here
            status: true,
          },
        },
      },
        
      })  
      const total=await prisma.auditLog.count();
      return res.status(200).json({
         data: audits,
         pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
         },
      });
      
   } catch (error) {
      console.error('Error fetching audit:', error);
      return res.status(500).json({ error: 'Internal server error' });
   }
}

export const editAuditInfo = async (req, res) => {
   try {
      const { action, adminEmail, car_id } = req.body;
      if (!car_id || !action || !adminEmail) {
      return res.status(400).json({ error: 'car_id, action, and adminName are required' });
    }
     if (!['APPROVED', 'REJECTED', 'EDIT'].includes(action)) {
     return res.status(400).json({ error: 'Invalid action type' });
    }
    const auditLog = await prisma.auditLog.create({
      data: {
        car_id,
        action,
        adminEmail,
      },
    });

    await prisma.car.update({
      where: { id: Number(car_id) },
      data: {
        status: action === 'APPROVED' ? 'APPROVED' :
                action === 'REJECTED' ? 'REJECTED' : undefined,
        reviewedBy: adminEmail,
        reviewedAt: new Date(),
      },
    });

    res.json({ message: 'Audit log submitted', data:auditLog });
   } catch (error) {
      console.error('Error updating audit:', error);
      return res.status(500).json({ error: 'Internal server error' });
   }
}