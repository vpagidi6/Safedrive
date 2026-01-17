// ignore_for_file: prefer_const_literals_to_create_immutables, prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../models/Distraction.dart';

class DistractionPreview extends StatelessWidget {
  final Distraction distraction;

  const DistractionPreview({required this.distraction});

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10),
        child: Row(
          children: [
            Text("hello"),
            Text("10/4/26"),
            Text("3:56:23"),
          ],
        ),
    );
  }
}