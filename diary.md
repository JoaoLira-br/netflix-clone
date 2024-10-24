102424

quebrei a cara por 20 minutos, logout button não estava redirecionando usuario para login: solucao: syntaxe de firebase estava errada: Eu botei `Auth.signOut()` O certo `signOut(auth)`. E sintaxe de botei `useEffect(()=> {...})` o certo era `useEffect(() => {...}, [])`: faltou `[]`: on Mount only