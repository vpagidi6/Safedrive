import 'package:cloud_firestore/cloud_firestore.dart';

class Distraction {
  final String classification;
  final String date;
  final String image;
  final String time;

  Distraction({
    required this.classification,
    required this.date,
    required this.image,
    required this.time,
  });

  factory Distraction.fromMap(Map<String, dynamic> map) {
    return Distraction(
        classification: map["classification"],
        date: map["date"],
        image: map["image"],
        time: map["time"]);
  }
}