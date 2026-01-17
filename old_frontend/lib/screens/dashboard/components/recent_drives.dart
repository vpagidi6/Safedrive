import 'package:admin/models/Distraction.dart';
import 'package:admin/models/RecentDrives.dart';
import 'package:admin/screens/dashboard/components/distraction_preview.dart';

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

import '../../../constants.dart';

class RecentFiles extends StatelessWidget {
  final List<Distraction> distractions;
  const RecentFiles({
    Key? key,
    required this.distractions,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(defaultPadding),
      decoration: BoxDecoration(
        color: secondaryColor,
        borderRadius: const BorderRadius.all(Radius.circular(10)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Recent Drives",
            style: Theme.of(context).textTheme.titleMedium,
          ),
          Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("Click to see Image"),
                  Text("Type of Distraction"),
                  Text("Date"),
                  Text("Time"),
                ],
              ),
              Container(
                height: 400,
                child: ListView.builder(
                  scrollDirection: Axis.vertical,
                  itemCount: distractions.length,
                  itemBuilder: (context, index) {
                    return DistractionPreview(
                      distraction: distractions[index],
                    );
                  },
                ),
              )
            ],
          ),
        ],
      ),
    );
  }
}

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
    ;
  }
}

DataRow recentFileDataRow(RecentDrive fileInfo) {
  return DataRow(
    cells: [
      DataCell(findIcon(fileInfo.distraction)),
      DataCell(
        Text(
          "${fileInfo.date}",
          //color: Color.,
        ),
      ),
      DataCell(
        Text(
          "${fileInfo.time}",
          //color: Color.,
        ),
      ),
      DataCell(
        Text(
          "${fileInfo.distraction}",
          //color: Color.,
        ),
      ),
    ],
  );
}
