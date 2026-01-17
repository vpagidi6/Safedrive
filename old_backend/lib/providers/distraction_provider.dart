import 'dart:async';
import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class DistractionProvider {
  FirebaseFirestore firestore = FirebaseFirestore.instance;

  Future<List<Map<String, dynamic>>> getDistractions() async {
    List<Map<String, dynamic>> distractionMetaData = [];
    await firestore.collection("classifications").get().then((querySnapshot) {
      querySnapshot.docs.forEach((doc) {
        distractionMetaData.add(doc.data());
      });
    });

    return distractionMetaData;
  }
}