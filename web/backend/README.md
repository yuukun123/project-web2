# 🌐 Web Backend — C# ASP.NET Core

## Công nghệ
- **Framework:** ASP.NET Core 8.0
- **ORM:** Entity Framework Core
- **Database:** MySQL 8.0
- **Auth:** JWT Bearer Token

## Cổng chạy
- **Development:** http://localhost:5000
- **Swagger UI:** http://localhost:5000/swagger

## Khởi tạo project
```bash
dotnet new webapi -n WebBackend
cd WebBackend
dotnet add package Pomelo.EntityFrameworkCore.MySql
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
```

## Chạy bằng Docker
```bash
docker-compose up web_backend
```
