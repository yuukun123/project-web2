# 🚀 Mobile Backend — Python FastAPI

## Công nghệ
- **Framework:** FastAPI 0.115
- **ORM:** SQLAlchemy 2.0
- **Database:** MySQL 8.0 (dùng chung với Web Backend)
- **Auth:** JWT (python-jose + passlib)
- **Server:** Uvicorn

## Cổng chạy
- **Development:** http://localhost:8000
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Khởi tạo local
```bash
python -m venv venv
venv\Scripts\activate       # Windows
source venv/bin/activate    # Linux/Mac
pip install -r requirements.txt
```

## Chạy local
```bash
uvicorn main:app --reload --port 8000
```

## Chạy bằng Docker
```bash
docker-compose up mobile_backend
```

## Cấu trúc thư mục đề xuất
```
mobile/backend/
├── main.py              # Entry point FastAPI
├── requirements.txt
├── Dockerfile
├── .env                 # Biến môi trường (DB, JWT secret...)
├── app/
│   ├── config/          # Cấu hình DB, settings
│   ├── models/          # SQLAlchemy models (ánh xạ 15 bảng DB)
│   ├── schemas/         # Pydantic schemas (request/response)
│   ├── routers/         # API routes (auth, products, orders...)
│   ├── services/        # Business logic
│   └── dependencies/    # Auth middleware, DB session
```
