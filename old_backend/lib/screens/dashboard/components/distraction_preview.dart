// ignore_for_file: prefer_const_literals_to_create_immutables, prefer_const_constructors

import 'package:admin/models/Distraction.dart';
import 'package:admin/models/RecentDrives.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class DistractionPreview extends StatelessWidget {
  final Distraction distraction;

  const DistractionPreview({required this.distraction});

  Icon findIcon(String? name) {
    if (name!.contains("Drinking")) {
      return Icon(Icons.no_drinks_rounded, color: Colors.red, size: 12);
    } else if (name!.contains("Talking on the phone")) {
      return Icon(Icons.phone, color: Colors.green, size: 12);
    } else if (name.contains("Texting")) {
      return Icon(Icons.phone_android_rounded, color: Colors.blue, size: 12);
    } else if (name.contains("Operating the radio")) {
      return Icon(Icons.radio, color: Colors.orange, size: 12);
    } else if (name == "Reaching behind") {
      return Icon(Icons.arrow_back, color: Colors.yellow, size: 12);
    } else if (name == "Hair and makeup") {
      return Icon(Icons.face, color: Colors.purple, size: 12);
    } else {
      return Icon(Icons.miscellaneous_services, color: Colors.white, size: 12);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: GestureDetector(
        onTap: () async {
          await showDialog(
              context: context,
              builder: (_) => imageDialog(context, distraction));
        },
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            IconButton(
                onPressed: () async {
                  await showDialog(
                      context: context,
                      builder: (_) => imageDialog(context, distraction));
                },
                icon: findIcon(distraction.classification)),
            //findIcon(distraction.classification),
            //SizedBox(width: 100.0,),
            Text(distraction.classification),
            //SizedBox(width: 100.0,),
            Text(distraction.date),
            //SizedBox(width: 100,),
            Text(distraction.time)
          ],
        ),
      ),
    );
  }
}

Widget imageDialog(context, Distraction distraction) {
  return Dialog(
    // backgroundColor: Colors.transparent,
    // elevation: 0,
    child: Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Image of Driving Distraction',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              IconButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                icon: Icon(Icons.close_rounded),
                color: Colors.redAccent,
              ),
            ],
          ),
        ),
        Container(
          height: 600,
          child: Image.network(
            distraction.image,
            fit: BoxFit.fitHeight,
          ),
        ),
      ],
    ),
  );
}
