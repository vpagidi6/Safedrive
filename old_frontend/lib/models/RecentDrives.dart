import 'package:admin/logic/distraction_event.dart';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

import '../providers/distraction_provider.dart';
import 'Distraction.dart';
import 'package:admin/repos/distraction_repository.dart';

late final Distraction distraction;

class RecentDrive {
  final String? date;
  final String? time;
  final String? distraction;
  //final IconButton iconType;

  RecentDrive(
      {this.date,
      this.time,
      this.distraction});
}

List demoRecentDrives = [
  RecentDrive(
    date: "1",
    time: "11:27:55",
    distraction: "drinking",
  ),
  RecentDrive(
    date: "1",
    time: "11:27:55",
    distraction: "drinking",
  ),
];
