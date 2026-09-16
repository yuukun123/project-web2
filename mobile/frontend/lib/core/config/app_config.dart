class AppConfig {
  // URL của Python FastAPI Backend
  static const String baseUrl = 'http://10.0.2.2:8000'; // Android emulator
  // static const String baseUrl = 'http://localhost:8000'; // iOS simulator
  // static const String baseUrl = 'http://192.168.x.x:8000'; // Thiết bị thật

  static const String apiVersion = '/api/v1';
  static const String apiUrl = '$baseUrl$apiVersion';

  // Timeout
  static const int connectTimeout = 10000; // 10 giây
  static const int receiveTimeout = 15000; // 15 giây

  // App info
  static const String appName = 'The Sweets';
  static const String appVersion = '1.0.0';
}
