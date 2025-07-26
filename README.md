| Route | Method | Description |
|-------|-------------|----------|
| http://localhost:8000/api/cars/createCar | `POST` | Create Car Deatils to show in listing |
| http://localhost:8000/api/user/signup | `POST` | create Admin Email (eg:name@example.com) |

This is json example for Admin Email register
{
  "name":"oneClickDrive",
  "email": "_name@example.com",
  "password": "abd" ("min 8 length")
}

This is json example for Car Listing

  {
  "title": "2024 Honda Civic - Reliable Compact",
  "description": "Fuel-efficient and reliable car perfect for city driving.",
  "make": "Honda",
  "model": "Civic",
  "year": 2025,
  "pricePerDay": 150,
  "location": "Chicago",
  "imageUrl": "/placeholder.svg?height=200&width=300",
  "features": [ "Fuel Efficient", "Backup Camera", "Bluetooth", "USB Ports"]
}

Prisma SetUp:
DATABASE_URL="postgresql://postgres:password@localhost:5432/Database_name?schema=public"
