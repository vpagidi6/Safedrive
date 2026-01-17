import 'package:bloc/bloc.dart';
import '../repos/distraction_repository.dart';
import 'distraction_event.dart';
import 'distraction_state.dart';


class DistractionBloc extends Bloc<DistractionEvent, DistractionState> {
  final DistractionRespositry _distractionRespositry;

  DistractionBloc(DistractionRespositry distractionRespositry)
      : _distractionRespositry = distractionRespositry,
        super(DistractionInitial());

  @override
  Stream<DistractionState> mapEventToState(DistractionEvent event) async* {
    if (event is GetDistractions) {
      yield* _mapGetDistractionsToState(event);
    }
  }

  Stream<DistractionState> _mapGetDistractionsToState(GetDistractions event) async* {
    yield DistractionLoading();
    final distractions = await _distractionRespositry.getDistractions();
    print(distractions);
    if (distractions != null) {
      yield DistractionObtained(distractions: distractions);
    } else {
      yield DistractionFailure(error: "failed to obtain Distractions");
    }
  }
}
