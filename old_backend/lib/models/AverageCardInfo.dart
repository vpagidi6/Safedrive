import 'package:admin/constants.dart';
import 'package:flutter/material.dart';
import 'Distraction.dart';
import 'package:admin/repos/distraction_repository.dart';

class AverageCardInfo {
  final String? title;
  final double? averageOccurencesPerDrive;
  final IconData iconType;
  final Color? iconColor;

  AverageCardInfo(
      {this.title,
      this.averageOccurencesPerDrive,
      required this.iconType,
      this.iconColor});
}

List demoMyFiles = [
  AverageCardInfo(
    title: "Texting",
    averageOccurencesPerDrive: 1.3,
    iconType: Icons.phone_android_rounded,
    iconColor: Colors.blue,
  ),
  AverageCardInfo(
    title: "Talking On The Phone",
    averageOccurencesPerDrive: 0.4,
    iconType: Icons.phone,
    iconColor: Colors.green,
  ),
  AverageCardInfo(
    title: "Operating The Radio",
    averageOccurencesPerDrive: 5.6,
    iconType: Icons.radio,
    iconColor: Colors.red,
  ),
  AverageCardInfo(
    title: "Drinking",
    averageOccurencesPerDrive: 0.1,
    iconType: Icons.no_drinks_rounded,
    iconColor: Colors.yellow,
  ),
  AverageCardInfo(
    title: "Reaching Behind",
    averageOccurencesPerDrive: 2.3,
    iconType: Icons.arrow_back,
    iconColor: Colors.orange,
  ),
  AverageCardInfo(
    title: "Hair and Makeup",
    averageOccurencesPerDrive: 1.9,
    iconType: Icons.face,
    iconColor: Colors.purple,
  ),
  AverageCardInfo(
    title: "Talking to Passenger",
    averageOccurencesPerDrive: 17.8,
    iconType: Icons.speaker,
    iconColor: Colors.pink,
  ),
];
