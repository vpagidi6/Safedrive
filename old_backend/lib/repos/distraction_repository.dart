import 'dart:async';
import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/Distraction.dart';
import '../providers/distraction_provider.dart';

class DistractionRespositry {
  final DistractionProvider _distractionProvider;

  DistractionRespositry(this._distractionProvider);

  Future<List<Distraction>> getDistractions() async {
    List<Map<String, dynamic>> distractionMetaData =
        await _distractionProvider.getDistractions();
    List<Map<String, dynamic>> docs = [];
    List<Distraction> distractions = [];

    distractionMetaData.map((doc) {
      docs.add(doc);
    }).toList();

    for (Map<String, dynamic> doc in docs) {
      distractions.add(Distraction.fromMap(doc));
    }

    return distractions;
  }
}
