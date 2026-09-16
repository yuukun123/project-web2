import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thesweets_mobile/main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const TheSweets());
    expect(find.byType(MaterialApp), findsOneWidget);
  });
}
