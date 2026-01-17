import 'package:equatable/equatable.dart';

abstract class DistractionEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class GetDistractions extends DistractionEvent {}