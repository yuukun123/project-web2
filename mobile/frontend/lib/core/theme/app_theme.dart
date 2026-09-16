import 'package:flutter/material.dart';

class AppTheme {
  // Màu chủ đạo cửa hàng bánh The Sweets
  static const Color primary = Color(0xFFD4845A);       // Nâu ấm (màu bánh)
  static const Color primaryDark = Color(0xFFB5623A);
  static const Color secondary = Color(0xFFF5C842);     // Vàng cream
  static const Color background = Color(0xFFFDF6F0);    // Kem nhạt
  static const Color surface = Color(0xFFFFFFFF);
  static const Color textPrimary = Color(0xFF2C1810);   // Nâu đậm
  static const Color textSecondary = Color(0xFF8D6E63);
  static const Color error = Color(0xFFE53935);
  static const Color success = Color(0xFF43A047);

  static ThemeData get lightTheme => ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: primary,
      primary: primary,
      secondary: secondary,
      surface: surface,
      error: error,
    ),
    scaffoldBackgroundColor: background,

    fontFamily: 'Poppins',
    appBarTheme: const AppBarTheme(
      backgroundColor: surface,
      foregroundColor: textPrimary,
      elevation: 0,
      centerTitle: true,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primary,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        padding: const EdgeInsets.symmetric(vertical: 14),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      filled: true,
      fillColor: surface,
    ),
  );
}
