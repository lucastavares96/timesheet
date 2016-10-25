module.exports = function (db) {

    //SERVICE
    //definition
    var service = this;
    service.salvarPlanilha = salvarPlanilha;
    service.buscarPlanilha = buscarPlanilha;
    return service;
        
    //implementation
    ////PUBLICS
    function buscarPlanilha(nomeUsuario, setor, ano, mes) {
        var _usuario = retornarUsuario(nomeUsuario, setor);
        if (!_usuario[ano]) {
            _usuario[ano] = {};
        }
        if (!_usuario[ano][mes]) {
            _usuario[ano][mes] = popularMes(ano, mes);
        }
        return _usuario[ano][mes];
    }

    function salvarPlanilha(nomeUsuario, setor, ano, mes, planilha) {
        var _usuario = retornarUsuario(nomeUsuario, setor);
        if (!_usuario[ano]) {
            _usuario[ano] = {};
        }
        _usuario[ano][mes] = planilha;

        salvarUsuario(nomeUsuario, setor, _usuario);
    }
        
    ////PRIVATES
    function retornarUsuario(nomeUsuario, setor) {
        var usuarioTratado = tratarUsuario(nomeUsuario, setor);
        if (!db.usuarios[usuarioTratado]) {
            db.usuarios[usuarioTratado] = {};
        }
        return db.usuarios[usuarioTratado];
    }

    function popularMes(ano, mes) {
        var numeroDias = new Date(ano, mes, 0).getDate();
        var listaDias = {};
        for (var i = 1; i <= numeroDias; i++) {
            var diaExtenso = ano + '/' + mes + '/' + i;
           listaDias[i] = Dia(diaExtenso);
        }
            return listaDias;
    }
    function salvarUsuario(nomeUsuario, setor, obj) {
        var usuarioTratado = tratarUsuario(nomeUsuario, setor);
        obj.nome = nomeUsuario;
        obj.setor = setor;
        db.usuarios[usuarioTratado] = obj;
    }

    function tratarUsuario(usuario, setor) {
        return usuario.replace(" ", "​_") + "_​" + setor.replace(" ", "_");
    }

    function Dia(data, entradaManha, saidaManha, entradaTarde, saidaTarde) {
        return {
            data: new Date(data),
            entradaManha: entradaManha ? entradaManha : new Date(0, 0, 0, 8, 30, 0, 0),
            saidaManha: saidaManha ? saidaManha : new Date(0, 0, 0, 12, 0, 0, 0),
            entradaTarde: entradaTarde ? entradaTarde : new Date(0, 0, 0, 13, 30, 0, 0),
            saidaTarde: saidaTarde ? saidaTarde : new Date(0, 0, 0, 18, 0, 0, 0),
        }
    }
}
