
(function () {
  const targets = document.querySelectorAll('.proj-card, .stat-card, .skill-group');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const delay = +el.dataset.animDelay || 0;
      setTimeout(() => {
        el.classList.add('anim-visible');
        el.addEventListener('animationend', () => {
          el.style.opacity = '';
          el.classList.remove('anim-enter', 'anim-visible');
        }, { once: true });
      }, delay);
      io.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  targets.forEach((el, i) => {
    el.classList.add('anim-enter');
    el.dataset.animDelay = (i % 3) * 90;
    io.observe(el);
  });
})();

const btn = document.getElementById('themeToggle');
  const ti  = document.getElementById('ti');
  const root = document.documentElement;

  function isDark() {
    const t = root.getAttribute('data-theme');
    return t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function apply(dark) {
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    ti.textContent = dark ? '🌚' : '☀️';
    try { localStorage.setItem('pf-theme', dark ? 'dark' : 'light'); } catch(e) {}
  }
  try {
    const s = localStorage.getItem('pf-theme');
    if (s) apply(s === 'dark');
    else ti.textContent = isDark() ? '🌚' : '🌚';
  } catch(e) {}
  btn.addEventListener('click', () => apply(!isDark()));

  let galleryImages = [];
  let galleryIndex = 0;

  function openProjectGallery(title, images) {
    galleryImages = images;
    galleryIndex = 0;

    document.getElementById("galleryTitle").textContent = title;

    document
      .getElementById("projectGallery")
      .classList.add("active");
    document.body.style.overflow = "hidden";

    createGalleryThumbs();
    showGalleryImage();
  }


  function closeProjectGallery() {
    document
      .getElementById("projectGallery")
      .classList.remove("active");

    document.body.style.overflow = "";
  }


  function showGalleryImage() {
    const image = document.getElementById("galleryImage");
    image.src = galleryImages[galleryIndex];
    image.alt = document.getElementById("galleryTitle").textContent;

    const prevBtn = document.querySelector(".gallery-prev");
    const nextBtn = document.querySelector(".gallery-next");
    if (prevBtn) prevBtn.disabled = galleryIndex === 0;
    if (nextBtn) nextBtn.disabled = galleryIndex === galleryImages.length - 1;

    updateGalleryThumbs();
  }


  function changeGalleryImage(direction) {
    const newIndex = galleryIndex + direction;
    if (newIndex < 0 || newIndex >= galleryImages.length) return;
    galleryIndex = newIndex;
    showGalleryImage();
  }


  function createGalleryThumbs() {
    const container = document.getElementById("galleryThumbs");
    container.innerHTML = "";

    galleryImages.forEach((src, index) => {
        const img = document.createElement("img");
      img.src = src;
      img.alt = `Imagem ${index + 1}`;
      img.addEventListener("click", () => {
        galleryIndex = index;
        showGalleryImage();
    });
    
    container.appendChild(img);
    });
  }


  function updateGalleryThumbs() {
    const thumbs = document.querySelectorAll("#galleryThumbs img");
      thumbs.forEach((thumb, index) => {
      thumb.classList.toggle(
        "active",
        index === galleryIndex
      );

    });
  }


  // CONTACT MODAL

  const FORMSPREE_ID = 'maeyvakn';

  function openContactModal() {
    document.getElementById('contactModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeContactModal() {
    document.getElementById('contactModal').classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeContactModal();
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const feedback = document.getElementById('cf-feedback');
      const submitBtn = contactForm.querySelector('.cf-submit');
      const submitText = submitBtn.querySelector('.cf-submit-text');
      const submitLoading = submitBtn.querySelector('.cf-submit-loading');

      submitBtn.disabled = true;
      submitText.hidden = true;
      submitLoading.hidden = false;
      feedback.hidden = true;
      feedback.className = 'cf-feedback';

      const data = new FormData(contactForm);

      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          feedback.textContent = '✓ Mensagem enviada com sucesso! Responderei em breve.';
          feedback.classList.add('success');
          feedback.hidden = false;
          contactForm.reset();
        } else {
          throw new Error('Erro no envio');
        }
      } catch {
        feedback.textContent = '✗ Erro ao enviar. Tente novamente ou contacte diretamente: sandra.alphatech@gmail.com';
        feedback.classList.add('error');
        feedback.hidden = false;
      } finally {
        submitBtn.disabled = false;
        submitText.hidden = false;
        submitLoading.hidden = true;
      }
    });
  }

  // HAMBURGER MENU
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      navLinks.classList.toggle('open', open);
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        navLinks.classList.remove('open');
      });
    });
  }

  const T = {
    pt: {
      'nav-home': 'Home', 'nav-sobre': 'Sobre', 'nav-hab': 'Habilidades',
      'nav-proc': 'Processo', 'nav-port': 'Portfólio', 'nav-acad': 'Proj. Acadêmicos', 'nav-cont': 'Contato',
      'hero-h': 'Olá, sou<br><em>a Sandra Silva</em>',
      'hero-sub': 'CEO da Alpha Tech e Velvet App.',
      'hero-desc': 'Sou desenvolvedora Full Stack com foco na criação de plataformas completas, escaláveis e bem estruturadas. Desenvolvo soluções de ponta a ponta, desde a lógica de backend, APIs e bancos de dados até interfaces intuitivas e experiências consistentes para o usuário. Meu objetivo é unir tecnologia, organização e usabilidade para transformar ideias em produtos funcionais e profissionais.',
      'hero-cta': 'Vamos trabalhar juntos',
      'stat-exp': 'Anos de Experiência', 'stat-proj': 'Projetos Concluídos', 'stat-cli': 'Clientes Satisfeitos',
      'about-label': 'Sobre Mim',
      'about-title': 'Sou Desenvolvedora Full Stack com Experiência em Produtos Digitais',
      'about-p1': 'Minha trajetória na tecnologia nasceu do interesse em transformar ideias em soluções reais. Tenho experiência em desenvolvimento Full Stack, bancos de dados, APIs, interfaces web e aplicações Android. Também desenvolvo e administro a Velvet, uma plataforma digital que me permite atuar em diferentes etapas de um produto, do desenvolvimento à experiência do usuário.',
      'about-p2': 'Tenho interesse em projetos de desenvolvimento web e mobile, sistemas, bancos de dados e produtos digitais. Busco desafios que me permitam aplicar meus conhecimentos, aprender novas tecnologias e criar soluções funcionais, organizadas e fáceis de utilizar.',
      'about-btn1': 'Meus Projetos', 'about-btn2': 'Download CV',
      'skills-title': 'Habilidades & Ferramentas',
      'skills-sub': 'Tecnologias que utilizo no desenvolvimento de soluções completas, do banco de dados à interface.',
      'sk-front': 'Frontend', 'sk-back': 'Backend', 'sk-db': 'Banco de Dados', 'sk-tools': 'Ferramentas & DevOps', 'sk-desk': 'Desktop',
      'proc-label': 'Como Trabalho', 'proc-title': 'Transformo Ideias em Soluções',
      'proc-desc': 'Estruturo cada projeto desde a compreensão do problema até a entrega, buscando equilíbrio entre tecnologia, organização, segurança e experiência do usuário.',
      's1n': '01. DESCOBERTA', 's1h': 'Entendimento do Projeto', 's1p': 'Analiso o problema, levanto requisitos, defino objetivos e identifico as necessidades do usuário.',
      's2n': '02. PLANEJAMENTO', 's2h': 'Arquitetura & Design', 's2p': 'Estruturo a solução, escolho as tecnologias e defino os fluxos e componentes necessários para o projeto.',
      's3n': '03. DESENVOLVIMENTO', 's3h': 'Construção da Solução', 's3p': 'Desenvolvo as funcionalidades com foco em código limpo, organização, segurança e boas práticas.',
      's4n': '04. TESTES', 's4h': 'Validação & Ajustes', 's4p': 'Testo as funcionalidades, identifico problemas e realizo os ajustes necessários antes da publicação.',
      's5n': '05. ENTREGA', 's5h': 'Deploy & Evolução', 's5p': 'Realizo a publicação da solução e acompanho sua evolução, manutenção e futuras melhorias.',
      'port-title': 'Projetos em Destaque',
      'pc-velvet': 'Plataforma Social', 'pd-velvet': 'Plataforma digital e app Android para criadoras de conteúdo, com publicação, interação e monetização em um ambiente próprio e integrado.',
      'pl-access': 'Acessar Projeto', 'pl-soon': 'Lançamento em breve', 'pl-restricted': 'Acesso Restrito à ADM Velvet',
      'pc-landing': 'Landing Page',
      'pd-aim': 'Landing page para apresentar a agência e seus serviços de gestão de criadores e lives em aplicativos, com foco na captação de novos talentos.',
      'pd-silva': 'Landing page para apresentar a Silva Talents, agência parceira da Velvet, divulgar seus serviços e captar novos criadores.',
      'pc-android': 'Aplicativo Android', 'pd-alpha': 'Reprodução de listas de canais, com interface simples e organizada, acesso rápido e experiência de reprodução prática e intuitiva.',
      'pc-dash': 'Dashboard', 'pd-dash': 'Dashboard administrativo da Velvet para gestão centralizada de criadores, usuários, conteúdos e operações da plataforma.',
      'pc-web': 'Página Web', 'pd-land': 'Página institucional para apresentar a história, valores e diferenciais da LanDogs, destacando a criação familiar de Bulldogs, o cuidado com os filhotes e a entrega internacional.',
      'acad-title': 'Projetos Acadêmicos',
      'pd-fitpro': 'Dashboard interativo desenvolvido em HTML, CSS e JavaScript para acompanhamento de métricas fitness, reunindo indicadores, gráficos, metas, histórico de treino e diferentes ferramentas de análise em uma única interface.',
      'pd-cand': 'Sistema web desenvolvido em ASP.NET Web Forms e C# para registo e consulta de candidaturas. A aplicação permite recolher dados pessoais, contactos, documentação e informações académicas/profissionais, armazenando os dados em SQL Server e apresentando posteriormente o resumo da candidatura submetida.',
      'pd-bib': 'Sistema web desenvolvido em ASP.NET para gestão e consulta de um catálogo de livros integrado a banco de dados. A aplicação apresenta os livros de forma dinâmica, com informações como capa, título, autor, editora e ano de publicação, além de permitir filtrar o catálogo por autor.',
      'pd-gym': 'Sistema web desenvolvido para o registo e gestão de clientes de uma aplicação de saúde e fitness. A interface permite introduzir dados pessoais e físicos, como nome, data de nascimento, e-mail, contacto, peso, altura e objetivo, com integração ao banco de dados.',
      'pd-lista': 'Sistema web desenvolvido para o registo e gestão de clientes de uma aplicação de saúde e fitness. A interface permite introduzir dados pessoais e físicos, como nome, data de nascimento, e-mail, contacto, peso, altura e objetivo, com integração ao banco de dados.',
      'pd-code': 'Dashboard interativo desenvolvido em HTML, CSS e JavaScript, reunindo 59 exercícios práticos de programação em diferentes módulos, com foco em lógica, funções, arrays, manipulação de dados, datas, validações e algoritmos.',
      'pd-cas': 'Jogo de casino interativo desenvolvido durante a formação em JavaScript, utilizando lógica de programação, eventos, geração de valores aleatórios e manipulação dinâmica da interface. O projeto inclui sistema de saldo, máquina de slots, histórico de jogadas, estatísticas e reinício da partida.',
      'pd-login': 'Interface de autenticação desenvolvida para o FitPro Performance Dashboard, com formulário de acesso, validação de credenciais, feedback de erro e transição para a aplicação após o login.',
      'pd-escola': 'Aplicação desktop desenvolvida em C# com Windows Forms e SQLite para gestão de alunos, incluindo autenticação administrativa, cadastro, atualização, desativação, pesquisa e exportação de dados.',
      'pd-notic': 'Aplicação web desenvolvida em ASP.NET Web Forms para apresentação dinâmica de notícias de economia através de um feed RSS externo. O sistema consome o conteúdo disponibilizado pela RTP, processa os dados em XML e apresenta as notícias em uma interface própria, permitindo manter o conteúdo atualizado a partir da fonte externa.',
      'pd-guia': 'Website turístico desenvolvido em HTML5 e CSS3 durante minha formação, com navegação estruturada, conteúdo multimédia, galeria, tabela, mapa interativo e diferentes recursos de HTML semântico.',
      'pd-app': 'Aplicação desenvolvida em Windows Forms com o objetivo de simular a experiência de um aplicativo, explorando uma interface gráfica personalizada e navegação entre diferentes funcionalidades. O projeto inclui sistema de login com validações, dashboard de utilizador, calculadora e conversor de temperatura entre Celsius, Fahrenheit e Kelvin.',
      'cta-h': 'Tem uma ideia de projeto? Vamos trabalhar juntos!',
      'cta-p': 'Estou aberta a novos projetos, colaborações e oportunidades. Entre em contato e vamos conversar.',
      'cta-btn': 'Entre em Contacto',
      'footer-copy': '© 2026 Sandra Silva - Alpha Tech. Todos os direitos reservados.',
      'btn-demo': 'Ver Demonstração',
      'pn-velvet': 'Velvet App', 'pn-aim': 'AImperium Agency', 'pn-silva': 'Silva Talents Agency',
      'pn-alpha': 'Alpha Prime', 'pn-dash': 'Dashboard ADM Velvet', 'pn-land': 'Land Dogs',
      'pn-fitpro': 'FitPro Performance Dashboard',
      'pn-cand': 'Candidatura — Sistema Web de Registo',
      'pn-bib': 'Biblioteca Digital — Sistema de Gestão de Livros',
      'pn-gym': 'GYM - Aplicação Web / Banco de Dados',
      'pn-lista': 'Lista de Turma — Sistema de Gestão / Banco de Dados',
      'pn-code': 'CodeFlow Dashboard',
      'pn-cas': 'Casino Game — JavaScript',
      'pn-login': 'FitPro - Sistema de Autenticação',
      'pn-escola': 'Escola Era — Sistema de Gestão de Alunos',
      'pn-notic': 'Notícias de Economia — Agregador RSS',
      'pn-guia': 'Guia Turístico de Lisboa',
      'pn-app': 'App Desktop — Simulação de Aplicação Mobile'
    },
    es: {
      'nav-home': 'Inicio', 'nav-sobre': 'Sobre Mí', 'nav-hab': 'Habilidades',
      'nav-proc': 'Proceso', 'nav-port': 'Portafolio', 'nav-acad': 'Proy. Académicos', 'nav-cont': 'Contacto',
      'hero-h': 'Hola, soy<br><em>Sandra Silva</em>',
      'hero-sub': 'CEO de Alpha Tech y Velvet App.',
      'hero-desc': 'Soy desarrolladora Full Stack enfocada en la creación de plataformas completas, escalables y bien estructuradas. Desarrollo soluciones de extremo a extremo, desde la lógica de backend, APIs y bases de datos hasta interfaces intuitivas y experiencias consistentes para el usuario. Mi objetivo es unir tecnología, organización y usabilidad para transformar ideas en productos funcionales y profesionales.',
      'hero-cta': 'Trabajemos juntos',
      'stat-exp': 'Años de Experiencia', 'stat-proj': 'Proyectos Completados', 'stat-cli': 'Clientes Satisfechos',
      'about-label': 'Sobre Mí',
      'about-title': 'Soy Desarrolladora Full Stack con Experiencia en Productos Digitales',
      'about-p1': 'Mi trayectoria en tecnología nació del interés en transformar ideas en soluciones reales. Tengo experiencia en desarrollo Full Stack, bases de datos, APIs, interfaces web y aplicaciones Android. También desarrollo y administro Velvet, una plataforma digital que me permite actuar en diferentes etapas de un producto, desde el desarrollo hasta la experiencia del usuario.',
      'about-p2': 'Me interesan los proyectos de desarrollo web y móvil, sistemas, bases de datos y productos digitales. Busco desafíos que me permitan aplicar mis conocimientos, aprender nuevas tecnologías y crear soluciones funcionales, organizadas y fáciles de usar.',
      'about-btn1': 'Mis Proyectos', 'about-btn2': 'Descargar CV',
      'skills-title': 'Habilidades & Herramientas',
      'skills-sub': 'Tecnologías que uso en el desarrollo de soluciones completas, desde la base de datos hasta la interfaz.',
      'sk-front': 'Frontend', 'sk-back': 'Backend', 'sk-db': 'Base de Datos', 'sk-tools': 'Herramientas & DevOps', 'sk-desk': 'Escritorio',
      'proc-label': 'Cómo Trabajo', 'proc-title': 'Transformo Ideas en Soluciones',
      'proc-desc': 'Estructuro cada proyecto desde la comprensión del problema hasta la entrega, buscando equilibrio entre tecnología, organización, seguridad y experiencia del usuario.',
      's1n': '01. DESCUBRIMIENTO', 's1h': 'Comprensión del Proyecto', 's1p': 'Analizo el problema, levanto requisitos, defino objetivos e identifico las necesidades del usuario.',
      's2n': '02. PLANIFICACIÓN', 's2h': 'Arquitectura & Diseño', 's2p': 'Estructuro la solución, elijo las tecnologías y defino los flujos y componentes necesarios para el proyecto.',
      's3n': '03. DESARROLLO', 's3h': 'Construcción de la Solución', 's3p': 'Desarrollo las funcionalidades con foco en código limpio, organización, seguridad y buenas prácticas.',
      's4n': '04. PRUEBAS', 's4h': 'Validación & Ajustes', 's4p': 'Pruebo las funcionalidades, identifico problemas y realizo los ajustes necesarios antes de la publicación.',
      's5n': '05. ENTREGA', 's5h': 'Deploy & Evolución', 's5p': 'Realizo la publicación de la solución y acompaño su evolución, mantenimiento y futuras mejoras.',
      'port-title': 'Proyectos Destacados',
      'pc-velvet': 'Plataforma Social', 'pd-velvet': 'Plataforma digital y app Android para creadoras de contenido, con publicación, interacción y monetización en un entorno propio e integrado.',
      'pl-access': 'Ver Proyecto', 'pl-soon': 'Próximamente', 'pl-restricted': 'Acceso Restringido a ADM Velvet',
      'pc-landing': 'Landing Page',
      'pd-aim': 'Landing page para presentar la agencia y sus servicios de gestión de creadores y lives en aplicaciones, con foco en la captación de nuevos talentos.',
      'pd-silva': 'Landing page para presentar Silva Talents, agencia socia de Velvet, difundir sus servicios y captar nuevos creadores.',
      'pc-android': 'Aplicación Android', 'pd-alpha': 'Reproducción de listas de canales, con interfaz simple y organizada, acceso rápido y experiencia de reproducción práctica e intuitiva.',
      'pc-dash': 'Dashboard', 'pd-dash': 'Dashboard administrativo de Velvet para gestión centralizada de creadores, usuarios, contenidos y operaciones de la plataforma.',
      'pc-web': 'Página Web', 'pd-land': 'Página institucional para presentar la historia, valores y diferenciales de LanDogs, destacando la crianza familiar de Bulldogs, el cuidado de los cachorros y la entrega internacional.',
      'acad-title': 'Proyectos Académicos',
      'pd-fitpro': 'Dashboard interactivo desarrollado en HTML, CSS y JavaScript para el seguimiento de métricas fitness, reuniendo indicadores, gráficos, metas, historial de entrenamiento y diferentes herramientas de análisis en una única interfaz.',
      'pd-cand': 'Sistema web desarrollado en ASP.NET Web Forms y C# para el registro y consulta de candidaturas. La aplicación permite recopilar datos personales, contactos, documentación e información académica/profesional, almacenando los datos en SQL Server y presentando posteriormente el resumen de la candidatura enviada.',
      'pd-bib': 'Sistema web desarrollado en ASP.NET para la gestión y consulta de un catálogo de libros integrado a base de datos. La aplicación presenta los libros de forma dinámica, con información como portada, título, autor, editorial y año de publicación, además de permitir filtrar el catálogo por autor.',
      'pd-gym': 'Sistema web desarrollado para el registro y gestión de clientes de una aplicación de salud y fitness. La interfaz permite introducir datos personales y físicos, como nombre, fecha de nacimiento, e-mail, contacto, peso, altura y objetivo, con integración a la base de datos.',
      'pd-lista': 'Sistema web desarrollado para el registro y gestión de clientes de una aplicación de salud y fitness. La interfaz permite introducir datos personales y físicos, como nombre, fecha de nacimiento, e-mail, contacto, peso, altura y objetivo, con integración a la base de datos.',
      'pd-code': 'Dashboard interactivo desarrollado en HTML, CSS y JavaScript, reuniendo 59 ejercicios prácticos de programación en diferentes módulos, con foco en lógica, funciones, arrays, manipulación de datos, fechas, validaciones y algoritmos.',
      'pd-cas': 'Juego de casino interactivo desarrollado durante la formación en JavaScript, utilizando lógica de programación, eventos, generación de valores aleatorios y manipulación dinámica de la interfaz. El proyecto incluye sistema de saldo, máquina de slots, historial de jugadas, estadísticas y reinicio de la partida.',
      'pd-login': 'Interfaz de autenticación desarrollada para el FitPro Performance Dashboard, con formulario de acceso, validación de credenciales, feedback de error y transición a la aplicación después del login.',
      'pd-escola': 'Aplicación de escritorio desarrollada en C# con Windows Forms y SQLite para la gestión de alumnos, incluyendo autenticación administrativa, registro, actualización, desactivación, búsqueda y exportación de datos.',
      'pd-notic': 'Aplicación web desarrollada en ASP.NET Web Forms para la presentación dinámica de noticias de economía a través de un feed RSS externo. El sistema consume el contenido proporcionado por la RTP, procesa los datos en XML y presenta las noticias en una interfaz propia, permitiendo mantener el contenido actualizado desde la fuente externa.',
      'pd-guia': 'Sitio web turístico desarrollado en HTML5 y CSS3 durante mi formación, con navegación estructurada, contenido multimedia, galería, tabla, mapa interactivo y diferentes recursos de HTML semántico.',
      'pd-app': 'Aplicación desarrollada en Windows Forms con el objetivo de simular la experiencia de una aplicación móvil, explorando una interfaz gráfica personalizada y navegación entre diferentes funcionalidades. El proyecto incluye sistema de login con validaciones, dashboard de usuario, calculadora y conversor de temperatura entre Celsius, Fahrenheit y Kelvin.',
      'cta-h': '¿Tienes una idea de proyecto? ¡Trabajemos juntos!',
      'cta-p': 'Estoy abierta a nuevos proyectos, colaboraciones y oportunidades. Contáctame y hablemos.',
      'cta-btn': 'Contactar',
      'footer-copy': '© 2026 Sandra Silva - Alpha Tech. Todos los derechos reservados.',
      'btn-demo': 'Ver Demostración',
      'pn-velvet': 'Velvet App', 'pn-aim': 'AImperium Agency', 'pn-silva': 'Silva Talents Agency',
      'pn-alpha': 'Alpha Prime', 'pn-dash': 'Dashboard ADM Velvet', 'pn-land': 'Land Dogs',
      'pn-fitpro': 'FitPro Performance Dashboard',
      'pn-cand': 'Candidatura — Sistema Web de Registro',
      'pn-bib': 'Biblioteca Digital — Sistema de Gestión de Libros',
      'pn-gym': 'GYM - Aplicación Web / Base de Datos',
      'pn-lista': 'Lista de Clase — Sistema de Gestión / Base de Datos',
      'pn-code': 'CodeFlow Dashboard',
      'pn-cas': 'Casino Game — JavaScript',
      'pn-login': 'FitPro - Sistema de Autenticación',
      'pn-escola': 'Escola Era — Sistema de Gestión de Alumnos',
      'pn-notic': 'Noticias de Economía — Agregador RSS',
      'pn-guia': 'Guía Turística de Lisboa',
      'pn-app': 'App de Escritorio — Simulación de Aplicación Móvil'
    },
    en: {
      'nav-home': 'Home', 'nav-sobre': 'About', 'nav-hab': 'Skills',
      'nav-proc': 'Process', 'nav-port': 'Portfolio', 'nav-acad': 'Academic Projects', 'nav-cont': 'Contact',
      'hero-h': "Hi, I'm<br><em>Sandra Silva</em>",
      'hero-sub': 'CEO of Alpha Tech and Velvet App.',
      'hero-desc': "I'm a Full Stack developer focused on building complete, scalable and well-structured platforms. I develop end-to-end solutions, from backend logic, APIs and databases to intuitive interfaces and consistent user experiences. My goal is to blend technology, organization and usability to turn ideas into functional, professional products.",
      'hero-cta': "Let's work together",
      'stat-exp': 'Years of Experience', 'stat-proj': 'Completed Projects', 'stat-cli': 'Satisfied Clients',
      'about-label': 'About Me',
      'about-title': 'Full Stack Developer with Experience in Digital Products',
      'about-p1': "My journey in technology started from an interest in turning ideas into real solutions. I have experience in Full Stack development, databases, APIs, web interfaces and Android applications. I also develop and manage Velvet, a digital platform that allows me to work across different stages of a product, from development to user experience.",
      'about-p2': "I'm interested in web and mobile development projects, systems, databases and digital products. I look for challenges that allow me to apply my knowledge, learn new technologies and create functional, organized and easy-to-use solutions.",
      'about-btn1': 'My Projects', 'about-btn2': 'Download CV',
      'skills-title': 'Skills & Tools',
      'skills-sub': 'Technologies I use to build complete solutions, from database to interface.',
      'sk-front': 'Frontend', 'sk-back': 'Backend', 'sk-db': 'Database', 'sk-tools': 'Tools & DevOps', 'sk-desk': 'Desktop',
      'proc-label': 'How I Work', 'proc-title': 'I Turn Ideas into Solutions',
      'proc-desc': 'I structure every project from understanding the problem to delivery, seeking balance between technology, organization, security and user experience.',
      's1n': '01. DISCOVERY', 's1h': 'Project Understanding', 's1p': 'I analyze the problem, gather requirements, define objectives and identify user needs.',
      's2n': '02. PLANNING', 's2h': 'Architecture & Design', 's2p': 'I structure the solution, choose the technologies and define the flows and components needed for the project.',
      's3n': '03. DEVELOPMENT', 's3h': 'Building the Solution', 's3p': 'I build features with a focus on clean code, organization, security and best practices.',
      's4n': '04. TESTING', 's4h': 'Validation & Adjustments', 's4p': 'I test features, identify issues and make necessary adjustments before deployment.',
      's5n': '05. DELIVERY', 's5h': 'Deploy & Growth', 's5p': 'I deploy the solution and follow its evolution, maintenance and future improvements.',
      'port-title': 'Featured Projects',
      'pc-velvet': 'Social Platform', 'pd-velvet': 'Digital platform and Android app for content creators, with publishing, interaction and monetization in a unified, integrated environment.',
      'pl-access': 'View Project', 'pl-soon': 'Coming Soon', 'pl-restricted': 'Restricted Access — Velvet ADM',
      'pc-landing': 'Landing Page',
      'pd-aim': 'Landing page presenting the agency and its creator management and live streaming services, focused on attracting new talents.',
      'pd-silva': 'Landing page presenting Silva Talents, Velvet\'s partner agency, to promote its services and attract new creators.',
      'pc-android': 'Android App', 'pd-alpha': 'Channel list player with a simple, organized interface, quick access and a practical and intuitive playback experience.',
      'pc-dash': 'Dashboard', 'pd-dash': "Velvet's administrative dashboard for centralized management of creators, users, content and platform operations.",
      'pc-web': 'Web Page', 'pd-land': "Institutional page presenting LanDogs' history, values and differentials, highlighting the family breeding of Bulldogs, puppy care and international delivery.",
      'acad-title': 'Academic Projects',
      'pd-fitpro': 'Interactive dashboard built with HTML, CSS and JavaScript for tracking fitness metrics, bringing together indicators, charts, goals, workout history and various analysis tools in a single interface.',
      'pd-cand': 'Web system developed in ASP.NET Web Forms and C# for registering and querying applications. The app collects personal data, contacts, documentation and academic/professional information, storing it in SQL Server and displaying a summary of the submitted application.',
      'pd-bib': 'Web system developed in ASP.NET for managing and browsing a database-connected book catalog. The app presents books dynamically, with information such as cover, title, author, publisher and publication year, and allows filtering the catalog by author.',
      'pd-gym': 'Web system developed for registering and managing clients of a health and fitness application. The interface allows entering personal and physical data such as name, date of birth, email, contact, weight, height and goal, with database integration.',
      'pd-lista': 'Web system developed for registering and managing clients of a health and fitness application. The interface allows entering personal and physical data such as name, date of birth, email, contact, weight, height and goal, with database integration.',
      'pd-code': 'Interactive dashboard built with HTML, CSS and JavaScript, bringing together 59 practical programming exercises across different modules, focused on logic, functions, arrays, data manipulation, dates, validations and algorithms.',
      'pd-cas': 'Interactive casino game developed during JavaScript training, using programming logic, events, random value generation and dynamic interface manipulation. The project includes a balance system, slot machine, game history, statistics and game restart.',
      'pd-login': 'Authentication interface built for the FitPro Performance Dashboard, with a login form, credential validation, error feedback and transition to the application after login.',
      'pd-escola': 'Desktop application built in C# with Windows Forms and SQLite for student management, including administrative authentication, registration, updating, deactivation, search and data export.',
      'pd-notic': 'Web application built in ASP.NET Web Forms for dynamic display of economy news via an external RSS feed. The system consumes content from RTP, processes the XML data and presents the news in its own interface, keeping content updated from the external source.',
      'pd-guia': 'Tourism website built in HTML5 and CSS3 during my training, with structured navigation, multimedia content, gallery, table, interactive map and various semantic HTML features.',
      'pd-app': 'Application built in Windows Forms with the goal of simulating a mobile app experience, exploring a custom graphical interface and navigation between different features. The project includes a login system with validations, user dashboard, calculator and temperature converter between Celsius, Fahrenheit and Kelvin.',
      'cta-h': 'Have a project idea? Let\'s work together!',
      'cta-p': "I'm open to new projects, collaborations and opportunities. Get in touch and let's talk.",
      'cta-btn': 'Get in Touch',
      'footer-copy': '© 2026 Sandra Silva - Alpha Tech. All rights reserved.',
      'btn-demo': 'View Demo',
      'pn-velvet': 'Velvet App', 'pn-aim': 'AImperium Agency', 'pn-silva': 'Silva Talents Agency',
      'pn-alpha': 'Alpha Prime', 'pn-dash': 'Velvet ADM Dashboard', 'pn-land': 'Land Dogs',
      'pn-fitpro': 'FitPro Performance Dashboard',
      'pn-cand': 'Application — Web Registration System',
      'pn-bib': 'Digital Library — Book Management System',
      'pn-gym': 'GYM - Web App / Database',
      'pn-lista': 'Class List — Management System / Database',
      'pn-code': 'CodeFlow Dashboard',
      'pn-cas': 'Casino Game — JavaScript',
      'pn-login': 'FitPro - Authentication System',
      'pn-escola': 'Escola Era — Student Management System',
      'pn-notic': 'Economy News — RSS Aggregator',
      'pn-guia': 'Lisbon Tourist Guide',
      'pn-app': 'Desktop App — Mobile App Simulation'
    }
  };

  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (T[lang] && T[lang][key] !== undefined) el.textContent = T[lang][key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (T[lang] && T[lang][key] !== undefined) el.innerHTML = T[lang][key];
    });
    document.querySelectorAll('.proj-btn-demo').forEach(el => {
      el.childNodes.forEach(node => {
        if (node.nodeType === 3 && node.textContent.trim()) {
          node.textContent = ' ' + (T[lang]['btn-demo'] || 'Ver Demonstração');
        }
      });
    });
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    document.documentElement.lang = lang;
    try { localStorage.setItem('pf-lang', lang); } catch(e) {}
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  try {
    const savedLang = localStorage.getItem('pf-lang');
    if (savedLang && T[savedLang]) applyLang(savedLang);
  } catch(e) {}

  document.addEventListener("keydown", function(event) {
    const gallery = document.getElementById("projectGallery");

    if (!gallery.classList.contains("active")) {
      return;
    }

    if (event.key === "Escape") {
      closeProjectGallery();
    }

    if (event.key === "ArrowLeft") {
      changeGalleryImage(-1);
    }

    if (event.key === "ArrowRight") {
      changeGalleryImage(1);
    }

  });
