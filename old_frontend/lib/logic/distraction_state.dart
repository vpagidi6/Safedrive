import 'package:equatable/equatable.dart';
import '../models/Distraction.dart';

abstract class DistractionState extends Equatable {
  @override
  List<Object> get props => [];
}

class DistractionInitial extends DistractionState {}

class DistractionLoading extends DistractionState {}

class DistractionObtained extends DistractionState {
  final List<Distraction> distractions;

  DistractionObtained({required this.distractions});

  @override
  List<Object> get props => [distractions];
}

class DistractionFailure extends DistractionState {
  final String error;

  DistractionFailure({required this.error});

  @override
  List<Object> get props => [error];
}
