// REDE NEURAL ARTIFICIAL feedForward


// função somatoria. Um elemento A cada produto multiplicativo do peso pela entrada
function funcSum(arr=[]) {
	// reduzir os elementos em um valor numérico (basicamente somar)
	return arr.reduce((a, b) => a + b);
}

// Cálculo do erro. DIferenca do valor obtido e do esperasdo. Aplicada ao erro.
function gradientDescent(n=0) {
	return n * (1 - n);
}

// 1 - Parâmetro Array. 2 - target, numerico para garantir integridade. 3 - epochs receberá 1 para temos
// no minimo 1 época de treinamento, primeira etapa do calculo q vai gerar os pesos aleatórios

// Inputs representa camada de entrada.

// Target  = busca servirá como parametro de comparação para todas as respostas emitidas em cada etapa

// Quanto mais próximo estivermos de target, mais nosso array terá aprendido. 

// Quanto mais distante, menos a rede terá aprendido.

// Fase de treinamento: execução dos backpropagations, a cada execução teremos pesos mais próximos do ideal
// nos emitindo respostas cada vez mais próximas de target.
function feedForward(inputs=[], target=0, epochs=1) {
	// Valores somente entre 0 e 1. Para facilitar aprendizado.
	// Se target é menos ou = a zero, target receberá um valor próximo de 0.
	if(target<=0) target = 0.1;
	// Averiguar se Target é maior q 1. Se sim, receberá 1.
	else if(target>1) target = 1;
	// array weights: irá representar os pesos q serãop multiplicados pelos valores e enteada 
	let weights = [];
	// inicializando pesos com valores aleatórios da primeira etapa do cálculo

	// A partir da primeira iteração do for, o neurônio passa a ser denominado RNA pq já terá recebido dados
	// do neurônio anterior, ligando um neurônio ao outro. Sempre que tivermos mais de uma iteração
	// no loop das épocas de treinamento, o neurônio irá evoluir para uma RNA. 
	for(let i=0; i<inputs.length; i++) {  // quantidade de elementos na camada de entrada
		// o índicie inicial de todo array em javascript é zero
		weights.push(Math.random()); // elementos aleatórios iniciados através de push
	} // valor aleatório inicial para cada valor de entrada

	for(let i=1; i<=epochs; i++) { // variável de controle 'i'. Iniciando em 1 pq quero exibir o indicie
	//  representando as posições de cada iteração das nossas épocas de treinamento
		let multiply = []; // array iniciado com vazio, e cada elemento terá peso x entrada
		for(let j=0; j<inputs.length; j++) {
			if(inputs[j]<=0) inputs[j] = 0.1; // Averiguar se inputs em j <= 0.
			multiply.push(inputs[j] * weights[j]);
		}

		let sum = funcSum(multiply); // irá receber o retorno da função somatória no array Mulitply
		let output = parseFloat(relu(sum)).toFixed(4); // uma tangente hiperbólica p formatar os dados
		// qq valor numerico dentro de intervalo entre -1 e 1.
		// 4 casas decimais, para melhor entendimento.

		let error = parseFloat(Math.abs(target - output)).toFixed(4); //valor absoluto p calcular a diferença
		// do valor retornado em output p o valor que quero como resposta em target.
		
		for(let j=0; j<inputs.length; j++) { 
			// estarei otimizando os pesos ao final do loo pp ara a próxima iteração, tornando os 
			// pesos mais precisos e cada vez fornecendo resultados mais próximos de target.
			weights[j] += inputs[j] * gradientDescent(error);
		}
		let epoch = i.toString().padStart(7, '0'); // poder formatar o índicie na saída, usando 7 espaços
		// completados por zero.

		// exibir o processamento de forma descritiva. Exibir a época contida na variável epoch que
		// recebeu indicie i, receber a taxa de erro q deverá diminior a cada iteração, e estarei
		// mais próximo de trarget. Essa taxa está o valor da variável error.
		// Ecxibir tmb a saída contida em output 
		console.log(`época: ${epoch} - taxa de erro: ${error} - saída: ${output}`);
	}
}

// PS. Nem sempre a tangente hiperbólica será a ideal

// FUNÇÕES DE FORMATAÇÃO (ATIVAÇÃO)
// Usar a tangente hiperbólica para melhorar aprendizado

// tangente hip retorna valores entre -1 e 1
function tanh(n=0) { return Math.sinh(n) / Math.cosh(n); }
// sigmpode retorna etre 0 e 1
function sigmoid(n=0) { return 1 / (1 + Math.pow(Math.E, -n)); }
//  Unidade Linear Retificada (relu) retorna somente nulos epositivos
function relu(n=o) { return Math.max(n, 0); }
// leaky relu somente maiores q zero
function leakyRelu(n=0) { return Math.max(n, 0.01); }
// binário retirna somente 0 ou 1.
function binaryStep(n=0) { return (n >= 0) ? 1 : 0; }



// primeiro pamarâmetro usar 0, para simplificar aprendizagem.
// segundo valor de busca: valor q desejamos obter como resposta. Definir 0.1
// terceiro: definir épocas como limite para a rede aprender. Usar apenas 10 épocas.
// Transformar 0 em 0.1, com 10 épocas de tempo para transformar 0 em 0.1.

// IMPORTANTE: se iusar quanto dade grande de épocas, a rede poderá encontrar antes da hora e
// execitar os ŕocimos de forma denecessaria, demorando p emirie o resultado. Se usar uma quantodade
// redizuda, não estarei dando o tempoi necessário patra aprender, tranzendo resultado abaixo do q espera.
//feedForward([0], 0.1, 800);


// Mais de uma entrada e uma saída.
feedForward([0, 0], 0.2, 1000);


