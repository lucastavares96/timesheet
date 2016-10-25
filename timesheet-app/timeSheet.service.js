(function () {

	angular.module("timeSheetApp")
		.factory("timeSheetService", TimeSheetService);

	function TimeSheetService($timeout, $http) {
		var urls = {};
		urls.base = "http://localhost:3000/";
		urls.buscarPlanilha = urls.base + "planilha";
		urls.salvarPlanilha = urls.base + "planilha";

		var service = {};
		service.buscarPlanilha = buscarPlanilha;
		service.salvarPlanilha = salvarPlanilha;
		return service;

		function buscarPlanilha(nomeUsuario, setor, ano, mes, callback) {
            $http.get(urls.buscarPlanilha + "?nomeUsuario=" + nomeUsuario + "&setor=" + setor + "&ano=" + ano + "&mes=" + mes).then(function (response) {
				console.log(response);
				var dias = response.data;
				for(var dia in dias){
					var diaFormatado = dias[dia];
					for(var attr in diaFormatado){
						diaFormatado[attr] = new Date(diaFormatado[attr]);
					}
				}
				dias[dia] = diaFormatado;
                callback(dias);
            });
        }

        function salvarPlanilha(nomeUsuario, setor, ano, mes, planilha, callBack, failCallback) {
            $http.post(urls.salvarPlanilha, { nomeUsuario: nomeUsuario, setor: setor, ano: ano, mes: mes, planilha: planilha }).then(function (response) {
                if (response.data.erro) {
                    failCallback(response.data.erro);
                } else {
                    callBack(response.data.planilha);
                }
            });
		}

		function Lista(entradaManha, saidaManha, entradaTarde, saidaTarde) {
			return {
				entradaManha: entradaManha ? entradaManha : new Date(0, 0, 0, 8, 30, 0, 0),
				saidaManha: saidaManha ? saidaManha : new Date(0, 0, 0, 12, 0, 0, 0),
				entradaTarde: entradaTarde ? entradaTarde : new Date(0, 0, 0, 13, 30, 0, 0),
				saidaTarde: saidaTarde ? saidaTarde : new Date(0, 0, 0, 18, 0, 0, 0)
			}
		}
	}
} ());