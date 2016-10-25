module.exports = function (app, service) {
	// service.buscarPlanilha = buscarPlanilha;
	app.get('/planilha', function (requisicao, resposta) {
		resposta.send(service.buscarPlanilha(requisicao.query.nomeUsuario, requisicao.query.setor, requisicao.query.ano, requisicao.query.mes));
	});
	app.post('/planilha', function (requisicao, resposta) {
		var msg = service.salvarPlanilha(requisicao.body.nomeUsuario, requisicao.body.setor, requisicao.body.ano, requisicao.body.mes, requisicao.body.planilha);
		resposta.send(msg);
	});
}