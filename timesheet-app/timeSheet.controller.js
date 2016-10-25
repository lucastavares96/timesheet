(function () {

    angular.module("timeSheetApp").controller("timesheetController", TimeSheetController);

    function TimeSheetController($scope, timeSheetService) {
        $scope.listaHorarios = {};
        $scope.colaborador = "";
        $scope.setor = "";
        $scope.ano = "";
        $scope.mes = "";
        $scope.anosDisponiveis = calcularAnos;
        $scope.buscarPlanilha = buscarPlanilha;
        $scope.salvarPlanilha = salvarPlanilha;

        function calcularAnos() {
            var dataAtual = new Date();
            var anoAtual = dataAtual.getUTCFullYear()
            var dezAnos = anoAtual - 10;
            var anosDisponiveis = []
            for (dezAnos; dezAnos <= anoAtual; dezAnos++) {
                anosDisponiveis.push(dezAnos);
            }
            return anosDisponiveis;
        }
        function salvarPlanilha() {
            timeSheetService.salvarPlanilha($scope.colaborador, $scope.setor, $scope.ano, $scope.mes, $scope.listaHorarios, function (data) {
                
                console.log($scope.listaHorarios);
            }, function (erro) {
                alert(erro);
            });
        }

        function buscarPlanilha() {
            timeSheetService.buscarPlanilha($scope.colaborador, $scope.setor, $scope.ano, $scope.mes, function (data) {
                $scope.listaHorarios = data;
                console.log($scope.listaHorarios);
            })
        }

    }
} ())