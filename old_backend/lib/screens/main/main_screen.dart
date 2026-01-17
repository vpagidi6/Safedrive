import 'package:admin/controllers/MenuAppController.dart';
import 'package:admin/logic/distraction_bloc.dart';
import 'package:admin/logic/distraction_event.dart';
import 'package:admin/logic/distraction_state.dart';
import 'package:admin/providers/distraction_provider.dart';
import 'package:admin/repos/distraction_repository.dart';
import 'package:admin/responsive.dart';
import 'package:admin/screens/dashboard/dashboard_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';

import 'components/side_menu.dart';

class MainScreenRedirect extends StatelessWidget {
  const MainScreenRedirect({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      child: BlocProvider<DistractionBloc>(
        create: (context) => DistractionBloc(
            new DistractionRespositry(new DistractionProvider()))
          ..add(GetDistractions()),
        child: MainScreen(),
      ),
    );
  }
}

class MainScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: context.read<MenuAppController>().scaffoldKey,
      drawer: SideMenu(),
      body: BlocConsumer<DistractionBloc, DistractionState>(
          listener: (context, state) {},
          builder: (context, state) {
            if (state is DistractionObtained) {
              return SafeArea(
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // We want this side menu only for large screen
                    if (Responsive.isDesktop(context))
                      Expanded(
                        // default flex = 1
                        // and it takes 1/6 part of the screen
                        child: SideMenu(),
                      ),
                    Expanded(
                      // It takes 5/6 part of the screen
                      flex: 5,
                      child: DashboardScreen(
                        distractions: state.distractions,
                      ),
                    ),
                  ],
                ),
              );
            }
            return Container();
          }),
    );
  }
}
