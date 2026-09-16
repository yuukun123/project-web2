import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'core/theme/app_theme.dart';

// ─── Routes ───────────────────────────────────────────────────────────────────
final _router = GoRouter(
  initialLocation: '/login',
  routes: [
    GoRoute(path: '/login',   builder: (ctx, state) => const _PlaceholderScreen(title: 'Đăng nhập')),
    GoRoute(path: '/home',    builder: (ctx, state) => const _PlaceholderScreen(title: 'Trang chủ')),
    GoRoute(path: '/cart',    builder: (ctx, state) => const _PlaceholderScreen(title: 'Giỏ hàng')),
    GoRoute(path: '/orders',  builder: (ctx, state) => const _PlaceholderScreen(title: 'Đơn hàng')),
    GoRoute(path: '/profile', builder: (ctx, state) => const _PlaceholderScreen(title: 'Hồ sơ')),
  ],
);

// ─── App Entry Point ──────────────────────────────────────────────────────────
void main() {
  runApp(
    const ProviderScope(
      child: TheSweets(),
    ),
  );
}

class TheSweets extends StatelessWidget {
  const TheSweets({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'The Sweets',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      routerConfig: _router,
    );
  }
}

// ─── Placeholder (Tạm thời để test chạy được) ─────────────────────────────────
class _PlaceholderScreen extends StatelessWidget {
  final String title;
  const _PlaceholderScreen({required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('🍰', style: TextStyle(fontSize: 64)),
            const SizedBox(height: 16),
            Text(title, style: Theme.of(context).textTheme.headlineSmall),
            const SizedBox(height: 8),
            const Text('The Sweets — Coming soon...'),
          ],
        ),
      ),
    );
  }
}
