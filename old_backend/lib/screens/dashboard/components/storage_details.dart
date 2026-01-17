import 'package:flutter/material.dart';

import '../../../constants.dart';
import 'chart.dart';
import 'storage_info_card.dart';

class StorageDetails extends StatelessWidget {
  const StorageDetails({
    Key? key,
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
            "Distraction Breakdown",
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: defaultPadding),
          Chart(),
          StorageInfoCard(
            iconSymbol: Icons.phone_android_rounded,
            title: "Texting",
          ),
          StorageInfoCard(
            iconSymbol: Icons.phone,
            title: "Talking On The Phone",
          ),
          StorageInfoCard(
            iconSymbol: Icons.radio,
            title: "Operating the Radio",
          ),
          StorageInfoCard(
            iconSymbol: Icons.no_drinks_rounded,
            title: "Drinking",
          ),
          StorageInfoCard(
            iconSymbol: Icons.arrow_back,
            title: "Reaching Behind",
          ),
          StorageInfoCard(
            iconSymbol: Icons.face,
            title: "Hair and Makeup",
          ),
          StorageInfoCard(
            iconSymbol: Icons.speaker,
            title: "Talking to Passenger",
          ),
        ],
      ),
    );
  }
}
