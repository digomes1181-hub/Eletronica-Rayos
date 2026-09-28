import React, { useState, useEffect } from 'react';
import {
  Zap,
  Tv,
  Volume2,
  Cpu,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Truck,
  CreditCard,
  Search,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  X,
  Wrench,
  Sparkles,
  Award,
  Check,
  Menu,
  Send,
  HelpCircle,
  TrendingUp,
  ShoppingBag,
  Wind,
  Plug,
  Layers
} from 'lucide-react';
import shopBannerImg from './assets/shop_banner.png';
import eletronicaRayosLogo from './assets/eletronica_rayos_logo.png';
import './App.css';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

// E-Commerce Product Catalog Data (Apenas Eletrônicos, Controles & Componentes)
const productsData = [
  {
    id: 1,
    category: 'controles',
    title: 'Controle Remoto Smart TV Universal',
    spec: 'Compatível com Samsung, LG, TCL, Philco, AOC, Philips e receptores.',
    price: 'R$ 35,00',
    stock: 'Em Estoque'
  },
  {
    id: 2,
    category: 'cabos',
    title: 'Cabo HDMI 4K Ultra HD 2.0 (2 Metros)',
    spec: 'Cabo blindado de alta velocidade com conectores banhados a ouro.',
    price: 'R$ 25,00',
    stock: 'Em Estoque'
  },
  {
    id: 3,
    category: 'componentes',
    title: 'Kit Barras de LED para TV (32" a 55")',
    spec: 'Iluminação de reposição original para Smart TVs LED.',
    price: 'R$ 85,00',
    stock: 'Em Estoque'
  },
  {
    id: 4,
    category: 'cabos',
    title: 'Fonte de Alimentação Regulada 12V 5A',
    spec: 'Ideal para aparelhos de som, receptores, fitas LED e eletrônicos.',
    price: 'R$ 45,00',
    stock: 'Em Estoque'
  },
  {
    id: 5,
    category: 'audio',
    title: 'Caixa de Som Bluetooth Portátil',
    spec: 'Entrada USB, cartão SD, Rádio FM e alta fidelidade sonora.',
    price: 'R$ 120,00',
    stock: 'Em Estoque'
  },
  {
    id: 6,
    category: 'audio',
    title: 'Conversor & Receptor Digital HDTV',
    spec: 'Receba canais abertos em alta definição com controle remoto.',
    price: 'R$ 98,00',
    stock: 'Em Estoque'
  },
  {
    id: 7,
    category: 'componentes',
    title: 'Kit de Componentes Eletrônicos (CI, Capacitores)',
    spec: 'Capacitores de alta temperatura, resistores e circuitos integrados.',
    price: 'R$ 15,00',
    stock: 'Em Estoque'
  },
  {
    id: 8,
    category: 'cabos',
    title: 'Adaptadores Áudio & Vídeo P2/RCA/HDMI',
    spec: 'Conectores reforçados para equipamentos de som e imagem.',
    price: 'R$ 20,00',
    stock: 'Em Estoque'
  }
];

// Predefined Repair Estimator Options (Exclusivamente Eletrônica e Eletrodomésticos)
const estimatorData = {
  tv: {
    name: 'Televisores & Monitores',
    brands: ['Smart TV Samsung', 'Smart TV LG', 'Smart TV TCL / Semp', 'Philco / Britânia', 'AOC / Philips / Panasonic'],
    issues: [
      { id: 'led', label: 'Troca do Kit de Barras de LED (TV sem imagem / com som)', price: 'R$ 150 - R$ 320', time: '1 a 2 Dias' },
      { id: 'fonte', label: 'Reparo da Placa de Fonte (TV não liga / LED piscando)', price: 'R$ 130 - R$ 250', time: '1 Dia' },
      { id: 'principal', label: 'Reparo de Placa Principal / HDMI / sintonizador', price: 'R$ 160 - R$ 380', time: '1 a 3 Dias' },
      { id: 'substituicao', label: 'Troca de Conector de Antena / Cabo de Força', price: 'R$ 70 - R$ 120', time: 'No mesmo dia' },
    ]
  },
  eletro: {
    name: 'Micro-ondas, Secadores & Eletrodomésticos',
    brands: ['Micro-ondas (Brastemp, Electrolux, Consul, Panasonic)', 'Secadores de Cabelo (Taiff, Arno, Britânia, Gama)', 'Pranchas / Chapinhas Eletrônicas', 'Eletroeletrônicos Diversos'],
    issues: [
      { id: 'secador', label: 'Conserto de Secador de Cabelo / Prancha (Substituição de cabo/motor/resistência)', price: 'R$ 50 - R$ 110', time: '1 a 3 Horas' },
      { id: 'microondas', label: 'Conserto de Placa / Painel / Magnetron de Micro-ondas', price: 'R$ 110 - R$ 220', time: '1 Dia' },
      { id: 'chaves', label: 'Troca de Chaves Seletoras, Fusíveis e Térmicos', price: 'R$ 60 - R$ 120', time: 'No mesmo dia' },
      { id: 'eletrogeral', label: 'Manutenção em Eletroeletrônicos Diversos', price: 'R$ 60 - R$ 140', time: 'No mesmo dia' },
    ]
  },
  som: {
    name: 'Aparelhos de Som & Áudio',
    brands: ['Caixa Amplificada (Amvox, Mondial, Philco, Britânia)', 'Som Residencial / Micro System (Sony, Philips, Gradiente)', 'Receiver / Amplificador de Potência', 'Home Theater / Soundbar'],
    issues: [
      { id: 'potenciometro', label: 'Troca de Potenciômetro / Conector de Alimentação', price: 'R$ 60 - R$ 130', time: 'No mesmo dia' },
      { id: 'saida_som', label: 'Reparo da Saída de Áudio / Placa Amplificadora', price: 'R$ 120 - R$ 280', time: '1 a 2 Dias' },
      { id: 'fonte_som', label: 'Conserto de Fonte / Transformador de Som', price: 'R$ 90 - R$ 190', time: '1 Dia' },
      { id: 'revisao', label: 'Revisão Geral & Limpeza de Contatos', price: 'R$ 80 - R$ 140', time: '2 a 4 Horas' },
    ]
  },
  placas: {
    name: 'Placas Eletrônicas & Inversores',
    brands: ['Placa de Máquina de Lavar / Geladeira', 'Placa de Ar-Condicionado / Inversora', 'Fontes de Alimentação Chaveadas', 'Nobreaks & Estabilizadores'],
    issues: [
      { id: 'placa_lavadora', label: 'Substituição / Reparo de Placa de Lavadora & Geladeira', price: 'R$ 140 - R$ 260', time: '1 a 2 Dias' },
      { id: 'inversora', label: 'Reparo de Placa Inversora / Módulo Eletrônico', price: 'R$ 150 - R$ 320', time: '2 Dias' },
      { id: 'nobreak', label: 'Conserto de Nobreak / Estabilizador de Voltagem', price: 'R$ 100 - R$ 220', time: '1 Dia' },
      { id: 'fonte_ch', label: 'Manutenção em Fontes Chaveadas & Industriais', price: 'R$ 90 - R$ 180', time: '1 Dia' },
    ]
  }
};

// Preset OS Database Simulation para Eletrônica Rayos Cajuru
const osDatabase = {
  '40512': {
    os: '#40512',
    cliente: 'José Maria S.',
    aparelho: 'Smart TV Samsung 55" 4K - Troca de Kit de LED',
    statusStep: 4,
    statusText: 'Em Testes de Imagem',
    tecnico: 'Téc. Eletrônica Rayos',
    previsao: 'Hoje às 17:00',
    detalhes: 'Barras de LED substituídas por kit original novo. Aparelho em bancada de teste térmico.'
  },
  '40513': {
    os: '#40513',
    cliente: 'Mariana Oliveira',
    aparelho: 'Micro-ondas Brastemp 30L - Troca de Magnetron & Relé',
    statusStep: 3,
    statusText: 'Em Manutenção',
    tecnico: 'Téc. Eletrônica Rayos',
    previsao: 'Hoje às 18:00',
    detalhes: 'Componentes de alta tensão e painel restaurados. Efetuando testes de aquecimento.'
  },
  '40514': {
    os: '#40514',
    cliente: 'Antônio Carlos',
    aparelho: 'Secador de Cabelo Profissional Taiff - Troca de Resistência & Cabo',
    statusStep: 5,
    statusText: 'Pronto para Retirada!',
    tecnico: 'Téc. Eletrônica Rayos',
    previsao: 'Pronto para Retirada',
    detalhes: 'Substituição do conjunto de aquecimento e chave seletora concluída com sucesso!'
  },
  '40515': {
    os: '#40515',
    cliente: 'Regina Célia',
    aparelho: 'Caixa de Som Amplificada Philco - Troca de Conector & Potenciômetro',
    statusStep: 5,
    statusText: 'Pronto para Retirada!',
    tecnico: 'Téc. Eletrônica Rayos',
    previsao: 'Pronto para Retirada',
    detalhes: 'Aparelho revisado, áudio limpo sem ruídos e liberado para entrega na loja!'
  }
};

// Social proof notifications generator for Eletrônica Rayos
const liveNotifications = [
  'Cliente de Cajuru-SP adquiriu Controle Remoto Universal na loja',
  'Smart TV 55" teve barras de LED trocadas na Eletrônica Rayos',
  'Secador de Cabelo profissional revisado e entregue no mesmo dia!',
  'Placa de Micro-ondas consertada com garantia de 90 dias!',
  'Cliente adquiriu fonte de alimentação 12V em nossa loja física!'
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // E-Commerce Filter State
  const [productFilter, setProductFilter] = useState('todos');

  // Estimator Form State
  const [calcCategory, setCalcCategory] = useState('tv');
  const [calcBrand, setCalcBrand] = useState(estimatorData.tv.brands[0]);
  const [calcIssueId, setCalcIssueId] = useState(estimatorData.tv.issues[0].id);

  // OS Tracker State
  const [searchOs, setSearchOs] = useState('40512');
  const [currentOsData, setCurrentOsData] = useState(osDatabase['40512']);

  const instagramLink = 'https://www.instagram.com/eletronica_rayos/?e=97b37531-017a-4efa-a2a7-f9828f007459&g=5';
  const facebookLink = 'https://www.facebook.com/RayosTec/';

  // Handle category change in estimator
  const handleCategoryChange = (catKey) => {
    setCalcCategory(catKey);
    setCalcBrand(estimatorData[catKey].brands[0]);
    setCalcIssueId(estimatorData[catKey].issues[0].id);
  };

  // Get selected issue object
  const selectedIssueObj = estimatorData[calcCategory].issues.find(i => i.id === calcIssueId) || estimatorData[calcCategory].issues[0];

  // OS Search Handler
  const handleSearchOs = (e) => {
    e?.preventDefault();
    const cleanNum = searchOs.replace('#', '').trim();
    if (osDatabase[cleanNum]) {
      setCurrentOsData(osDatabase[cleanNum]);
    } else {
      setCurrentOsData({
        os: `#${cleanNum || '00000'}`,
        cliente: 'Cliente Cadastrado',
        aparelho: 'Aparelho na Bancada',
        statusStep: 1,
        statusText: 'Recebido na Eletrônica Rayos',
        tecnico: 'Equipe Eletrônica Rayos',
        previsao: 'Previsão em até 24h',
        detalhes: 'Seu aparelho deu entrada na Eletrônica Rayos em Cajuru-SP e está na fila de análise técnica.'
      });
    }
  };

  // Toast cycling effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % liveNotifications.length;
      setToastMessage(liveNotifications[index]);
    }, 10000);
    setToastMessage(liveNotifications[0]);
    return () => clearInterval(interval);
  }, []);

  const whatsappPhone = '5516991707657';
  const whatsappBaseUrl = `https://wa.me/${whatsappPhone}`;

  const buildWhatsappLink = (text) => {
    return `${whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
  };

  const filteredProducts = productFilter === 'todos' 
    ? productsData 
    : productsData.filter(p => p.category === productFilter);

  return (
    <div className="app-root">
      {/* Announcement Bar */}
      <div className="top-bar">
        <Sparkles size={16} className="neon-text" />
        <span>⚡ <strong>Eletrônica Rayos em Cajuru-SP</strong> | Conserto de TVs, Micro-ondas, Secadores & Eletroeletrônicos | Fone: (16) 3667-1944</span>
        <a
          href={buildWhatsappLink('Olá! Vi o site da Eletrônica Rayos e gostaria de informações sobre consertos e produtos!')}
          target="_blank"
          rel="noopener noreferrer"
          className="badge badge-neon"
          style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
        >
          Whats (16) 99170-7657 💬
        </a>
      </div>

      {/* Header / Navbar */}
      <header className="navbar-sticky">
        <div className="container nav-container">
          <a href="#" className="brand-logo" title="Eletrônica Rayos - Início">
            <img src={eletronicaRayosLogo} alt="Eletrônica Rayos Logo" className="brand-logo-img" />
          </a>

          {/* Navigation Links */}
          <ul className="nav-links">
            <li><a href="#loja" className="nav-link">Loja & Produtos</a></li>
            <li><a href="#servicos" className="nav-link">Serviços de Reparo</a></li>
            <li><a href="#orcamento" className="nav-link">Simulador</a></li>
            <li><a href="#rastreamento" className="nav-link">Rastrear OS</a></li>
            <li><a href="#sobre" className="nav-link">Sobre Nós</a></li>
            <li><a href="#depoimentos" className="nav-link">Depoimentos</a></li>
            <li><a href="#faq" className="nav-link">FAQ</a></li>
            <li><a href="#contato" className="nav-link">Contato</a></li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <a
              href="tel:1636671944"
              className="btn btn-outline btn-sm"
              title="Ligar para a Eletrônica Rayos (16) 3667-1944"
            >
              <Phone size={16} /> (16) 3667-1944
            </a>
            <a
              href={buildWhatsappLink('Olá Eletrônica Rayos! Gostaria de consultar um produto ou conserto.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
            >
              <MessageSquare size={16} /> (16) 99170-7657
            </a>
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <a href="#loja" className="nav-link" onClick={() => setMobileMenuOpen(false)}>🛒 Loja & Produtos Eletrônicos</a>
            <a href="#servicos" className="nav-link" onClick={() => setMobileMenuOpen(false)}>🛠️ Conserto de TVs, Micro-ondas & Eletroeletrônicos</a>
            <a href="#orcamento" className="nav-link" onClick={() => setMobileMenuOpen(false)}>🧮 Simulador de Orçamento & Peças</a>
            <a href="#rastreamento" className="nav-link" onClick={() => setMobileMenuOpen(false)}>🔍 Rastrear Ordem de Serviço (OS)</a>
            <a href="#sobre" className="nav-link" onClick={() => setMobileMenuOpen(false)}>⚡ Sobre a Eletrônica Rayos em Cajuru</a>
            <a href="#depoimentos" className="nav-link" onClick={() => setMobileMenuOpen(false)}>⭐ Depoimentos de Clientes</a>
            <a href="#faq" className="nav-link" onClick={() => setMobileMenuOpen(false)}>❓ Perguntas Frequentes</a>
            <a href="#contato" className="nav-link" onClick={() => setMobileMenuOpen(false)}>📍 Endereço & Contatos (Cajuru/SP)</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge badge-neon">
              <Zap size={14} /> Eletrônica Geral & Eletrodomésticos | Cajuru - SP
            </div>
            <h1>
              Eletrônica Rayos <br />
              <span className="gradient-text">Comércio & Assistência Técnica</span>
            </h1>
            <p className="hero-subtitle">
              Loja completa de <strong>controles remotos, cabos, fontes e peças eletrônicas</strong>, além de assistência técnica especializada no conserto de <strong>TVs (LED, OLED, 4K), micro-ondas, secadores de cabelo, pranchas, aparelhos de som e eletrodomésticos em geral</strong> em Cajuru-SP.
            </p>

            <div className="hero-actions">
              <a
                href={buildWhatsappLink('Olá Eletrônica Rayos! Preciso de um orçamento para conserto do meu aparelho.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageSquare size={20} />
                WhatsApp (16) 99170-7657
              </a>
              <a href="tel:1636671944" className="btn btn-outline">
                <Phone size={18} />
                Ligar (16) 3667-1944
              </a>
            </div>

            <div className="hero-features-bar">
              <div className="hero-feature-item">
                <Clock size={18} />
                <span>Diagnóstico Rápido</span>
              </div>
              <div className="hero-feature-item">
                <ShieldCheck size={18} />
                <span>Garantia nos Reparos</span>
              </div>
              <div className="hero-feature-item">
                <CreditCard size={18} />
                <span>Facilidade no Cartão</span>
              </div>
              <div className="hero-feature-item">
                <Truck size={18} />
                <span>Cajuru - SP</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-card floating">
            <img src={shopBannerImg} alt="Eletrônica Rayos Cajuru SP" className="hero-visual-img" />
            <div className="hero-visual-overlay">
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>Eletrônica Rayos - Cajuru/SP</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Rua Vinte e Oito de Setembro, 723 - Centro</p>
              </div>
              <div className="status-badge-hero">
                <div className="pulse-dot"></div>
                <span>Loja & Bancada Abertas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog / Store Section */}
      <section id="loja" className="services-section">
        <div className="container">
          <div className="section-header">
            <div className="badge"><ShoppingBag size={14} /> Comércio de Eletrônicos</div>
            <h2>Produtos, Controles Remotos & Peças Eletrônicas</h2>
            <p>Encontre na Eletrônica Rayos os melhores controles remotos, conectores, cabos, fontes, acessórios e componentes para sua casa ou oficina.</p>
          </div>

          {/* Product Category Filters */}
          <div className="products-filter-bar">
            <button
              className={`filter-chip ${productFilter === 'todos' ? 'active' : ''}`}
              onClick={() => setProductFilter('todos')}
            >
              Todos os Produtos
            </button>
            <button
              className={`filter-chip ${productFilter === 'controles' ? 'active' : ''}`}
              onClick={() => setProductFilter('controles')}
            >
              📺 Controles Remotos
            </button>
            <button
              className={`filter-chip ${productFilter === 'cabos' ? 'active' : ''}`}
              onClick={() => setProductFilter('cabos')}
            >
              🔌 Cabos & Fontes
            </button>
            <button
              className={`filter-chip ${productFilter === 'componentes' ? 'active' : ''}`}
              onClick={() => setProductFilter('componentes')}
            >
              ⚡ Peças & LEDs de TV
            </button>
            <button
              className={`filter-chip ${productFilter === 'audio' ? 'active' : ''}`}
              onClick={() => setProductFilter('audio')}
            >
              📻 Áudio & Som
            </button>
          </div>

          {/* Product Cards Grid */}
          <div className="products-grid">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="product-card">
                <span className="product-badge-stock">{prod.stock}</span>
                <div className="product-icon-wrapper">
                  {prod.category === 'controles' && <Tv size={32} />}
                  {prod.category === 'cabos' && <Plug size={32} />}
                  {prod.category === 'componentes' && <Cpu size={32} />}
                  {prod.category === 'audio' && <Volume2 size={32} />}
                </div>
                <h4>{prod.title}</h4>
                <p className="spec">{prod.spec}</p>

                <div className="product-price-row">
                  <span className="product-price">{prod.price}</span>
                  <a
                    href={buildWhatsappLink(`Olá Eletrônica Rayos! Tenho interesse no produto: ${prod.title} (${prod.price}). Está disponível em estoque?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    Comprar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Exclusivamente Eletrônica e Eletrodomésticos */}
      <section id="servicos" className="services-section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge">Assistência Técnica de Confiança</div>
            <h2>Manutenção & Conserto em Eletrônica Geral e Eletrodomésticos</h2>
            <p>Laboratório estruturado para reparos de TVs, micro-ondas, secadores de cabelo, aparelhos de som e placas em Cajuru-SP.</p>
          </div>

          <div className="services-grid">
            {/* Card 1: Televisores */}
            <div className="service-card">
              <div className="service-icon-box">
                <Tv size={28} />
              </div>
              <h3>Conserto de TVs & Monitores</h3>
              <p className="desc">Smart TVs LED, OLED, QLED, 4K (Samsung, LG, TCL, Philco, AOC, Philips). Troca de barras de LED, placas e fontes.</p>
              <ul className="service-items-list">
                <li><Check size={16} /> Troca de kit de barras de LED (TV sem imagem / com som)</li>
                <li><Check size={16} /> Reparo de placa de fonte & alimentação de TV</li>
                <li><Check size={16} /> Conserto de placa principal & entradas HDMI</li>
                <li><Check size={16} /> Solução para TV que não liga ou pisca o LED</li>
              </ul>
              <div className="service-footer">
                <span className="service-price-tag">Orçamento Grátis</span>
                <a
                  href={buildWhatsappLink('Olá Eletrônica Rayos! Preciso de conserto para a minha TV!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  Pedir Orçamento
                </a>
              </div>
            </div>

            {/* Card 2: Micro-ondas, Secadores & Eletrodomésticos */}
            <div className="service-card">
              <div className="service-icon-box">
                <Wind size={28} />
              </div>
              <h3>Micro-ondas, Secadores & Eletro</h3>
              <p className="desc">Manutenção em micro-ondas, secadores de cabelo, pranchas/chapinhas e eletrodomésticos em geral.</p>
              <ul className="service-items-list">
                <li><Check size={16} /> Conserto de micro-ondas (troca de magnetron, painel, placa)</li>
                <li><Check size={16} /> Reparo em secadores de cabelo profissionais & domésticos</li>
                <li><Check size={16} /> Manutenção em pranchas, chapinhas e modeladores</li>
                <li><Check size={16} /> Conserto de chaves elétricas, térmicos e motores</li>
              </ul>
              <div className="service-footer">
                <span className="service-price-tag">Reparo Rápido</span>
                <a
                  href={buildWhatsappLink('Olá Eletrônica Rayos! Preciso consertar meu micro-ondas/secador/eletro!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  Pedir Orçamento
                </a>
              </div>
            </div>

            {/* Card 3: Áudio & Som */}
            <div className="service-card">
              <div className="service-icon-box">
                <Volume2 size={28} />
              </div>
              <h3>Aparelhos de Som & Áudio</h3>
              <p className="desc">Caixas de som amplificadas, receivers, home theaters, micro systems e equipamentos de áudio.</p>
              <ul className="service-items-list">
                <li><Check size={16} /> Reparo de caixas amplificadas (Amvox, Philco, Mondial)</li>
                <li><Check size={16} /> Substituição de conectores de carga & USB</li>
                <li><Check size={16} /> Conserto de saídas de áudio & potenciômetros</li>
                <li><Check size={16} /> Manutenção preventiva & limpeza de contatos</li>
              </ul>
              <div className="service-footer">
                <span className="service-price-tag">Avaliação Rápida</span>
                <a
                  href={buildWhatsappLink('Olá Eletrônica Rayos! Preciso consertar meu aparelho de som!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  Pedir Orçamento
                </a>
              </div>
            </div>

            {/* Card 4: Placas Eletrônicas & Inversores */}
            <div className="service-card">
              <div className="service-icon-box">
                <Layers size={28} />
              </div>
              <h3>Placas Eletrônicas & Fontes</h3>
              <p className="desc">Placas de lavadoras, geladeiras, ar-condicionado inversor, nobreaks e fontes chaveadas.</p>
              <ul className="service-items-list">
                <li><Check size={16} /> Manutenção em placas de lavadoras & geladeiras</li>
                <li><Check size={16} /> Reparo de placas inversoras & módulos eletrônicos</li>
                <li><Check size={16} /> Conserto de Nobreaks & estabilizadores de voltagem</li>
                <li><Check size={16} /> Reparo de fontes chaveadas & transformadores</li>
              </ul>
              <div className="service-footer">
                <span className="service-price-tag">Peças Originais</span>
                <a
                  href={buildWhatsappLink('Olá Eletrônica Rayos! Preciso consertar uma placa/fonte eletrônica!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  Pedir Orçamento
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estimator / Calculator Section */}
      <section id="orcamento" className="calc-section">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-neon"><Sparkles size={14} /> Estimativa Transparente</div>
            <h2>Simulador de Orçamento de Reparo & Peças</h2>
            <p>Selecione a categoria do seu aparelho para consultar uma estimativa imediata na Eletrônica Rayos.</p>
          </div>

          <div className="calc-card">
            <div className="calc-grid">
              <div>
                <div className="form-group">
                  <label>1. Categoria do Equipamento</label>
                  <select
                    className="form-select"
                    value={calcCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    <option value="tv">📺 Televisores & Monitores (LED, OLED, 4K)</option>
                    <option value="eletro">🌀 Micro-ondas, Secadores & Eletrodomésticos</option>
                    <option value="som">🔊 Aparelhos de Som & Caixas Amplificadas</option>
                    <option value="placas">⚡ Placas Eletrônicas, Inversores & Fontes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>2. Marca ou Tipo do Aparelho</label>
                  <select
                    className="form-select"
                    value={calcBrand}
                    onChange={(e) => setCalcBrand(e.target.value)}
                  >
                    {estimatorData[calcCategory].brands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>3. Defeito Apresentado ou Serviço</label>
                  <select
                    className="form-select"
                    value={calcIssueId}
                    onChange={(e) => setCalcIssueId(e.target.value)}
                  >
                    {estimatorData[calcCategory].issues.map((i) => (
                      <option key={i.id} value={i.id}>{i.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Result display */}
              <div className="calc-result-box">
                <div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Estimativa de Valor</span>
                  <div className="calc-price-display">{selectedIssueObj.price}</div>
                </div>

                <div className="calc-time-badge">
                  <Clock size={16} className="neon-text" />
                  <span>Prazo Estimado: <strong>{selectedIssueObj.time}</strong></span>
                </div>

                <a
                  href={buildWhatsappLink(
                    `Olá Eletrônica Rayos! Consultei no site o serviço: ${estimatorData[calcCategory].name} (${calcBrand}) - ${selectedIssueObj.label}. Gostaria de agendar o conserto!`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%' }}
                >
                  <MessageSquare size={18} />
                  Confirmar no WhatsApp (16) 99170-7657
                </a>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                  *Valores aproximados. A avaliação presencial em nossa loja em Cajuru-SP confirma os componentes exatos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OS Tracker Section */}
      <section id="rastreamento" className="os-tracker-section">
        <div className="container">
          <div className="section-header">
            <div className="badge"><Search size={14} /> Consulta de Ordem de Serviço</div>
            <h2>Rastreamento de OS na Eletrônica Rayos</h2>
            <p>Informe o número da sua Ordem de Serviço emitida em nossa loja para ver a situação atual do seu aparelho.</p>
          </div>

          <div className="os-tracker-card">
            <form onSubmit={handleSearchOs} className="os-search-bar">
              <input
                type="text"
                className="form-input"
                placeholder="Digite a OS (Ex: #40512)"
                value={searchOs}
                onChange={(e) => setSearchOs(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <Search size={18} />
                Consultar
              </button>
            </form>

            <div className="os-preset-chips">
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Exemplos de OS ativas:</span>
              {Object.keys(osDatabase).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`chip-btn ${searchOs.includes(key) ? 'active' : ''}`}
                  onClick={() => {
                    setSearchOs(key);
                    setCurrentOsData(osDatabase[key]);
                  }}
                >
                  OS #{key}
                </button>
              ))}
            </div>

            {/* Timeline steps */}
            <div className="os-timeline">
              <div className={`os-step ${currentOsData.statusStep >= 1 ? 'completed' : ''}`}>
                <div className="os-step-icon"><CheckCircle2 size={20} /></div>
                <div className="os-step-title">1. Entrada</div>
                <div className="os-step-desc">Recebido na Loja</div>
              </div>

              <div className={`os-step ${currentOsData.statusStep >= 2 ? (currentOsData.statusStep === 2 ? 'current' : 'completed') : ''}`}>
                <div className="os-step-icon"><Search size={20} /></div>
                <div className="os-step-title">2. Diagnóstico</div>
                <div className="os-step-desc">Análise de Bancada</div>
              </div>

              <div className={`os-step ${currentOsData.statusStep >= 3 ? (currentOsData.statusStep === 3 ? 'current' : 'completed') : ''}`}>
                <div className="os-step-icon"><Wrench size={20} /></div>
                <div className="os-step-title">3. Reparo</div>
                <div className="os-step-desc">Troca de Peças</div>
              </div>

              <div className={`os-step ${currentOsData.statusStep >= 4 ? (currentOsData.statusStep === 4 ? 'current' : 'completed') : ''}`}>
                <div className="os-step-icon"><Award size={20} /></div>
                <div className="os-step-title">4. Testes</div>
                <div className="os-step-desc">Teste de Qualidade</div>
              </div>

              <div className={`os-step ${currentOsData.statusStep >= 5 ? 'completed' : ''}`}>
                <div className="os-step-icon"><Truck size={20} /></div>
                <div className="os-step-title">5. Concluído</div>
                <div className="os-step-desc">Disponível para Retirada</div>
              </div>
            </div>

            {/* Status Details Card */}
            <div style={{ background: '#090d16', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.75rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-cyan)' }}>{currentOsData.os} - {currentOsData.cliente}</h4>
                  <p style={{ color: '#fff', fontWeight: 600 }}>{currentOsData.aparelho}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-neon">{currentOsData.statusText}</span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Previsão: {currentOsData.previsao}</p>
                </div>
              </div>

              <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                <strong>Parecer da Eletrônica Rayos ({currentOsData.tecnico}):</strong>
                <p style={{ marginTop: '0.3rem', color: 'var(--text-main)', fontStyle: 'italic' }}>"{currentOsData.detalhes}"</p>
              </div>

              <a
                href={buildWhatsappLink(`Olá Eletrônica Rayos! Gostaria de informações sobre a minha Ordem de Serviço ${currentOsData.os}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                <MessageSquare size={16} />
                Falar com a Eletrônica Rayos sobre esta OS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Differentials */}
      <section id="sobre" className="services-section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Tradição & Confiança</div>
            <h2>Sobre a Eletrônica Rayos em Cajuru-SP</h2>
            <p>Atendendo toda a cidade de Cajuru com comércio de produtos eletrônicos e assistência técnica especializada em eletroeletrônicos.</p>
          </div>

          {/* Company History */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0,229,255,0.06) 0%, rgba(123,97,255,0.06) 100%)',
            border: '1px solid rgba(0,229,255,0.18)',
            borderRadius: '20px',
            padding: '2.5rem 2.25rem',
            marginBottom: '2.5rem',
            maxWidth: '820px',
            margin: '0 auto 2.5rem auto',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative glow */}
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '160px', height: '160px',
              background: 'radial-gradient(circle, rgba(0,229,255,0.12), transparent 70%)',
              pointerEvents: 'none'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '12px',
                background: 'var(--gradient-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <TrendingUp size={22} color="#040914" />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary-cyan)' }}>
                Nossa História
              </span>
            </div>

            <p style={{ fontSize: '1.07rem', color: 'var(--text-main)', lineHeight: '1.85', marginBottom: '1.1rem' }}>
              <strong style={{ color: 'var(--primary-cyan)' }}>Você sabia que a Eletrônica Rayos nasceu em 2002</strong> para lhes oferecer a melhor prestação de serviços em áudio &amp; vídeo?
            </p>
            <p style={{ fontSize: '1.07rem', color: 'var(--text-main)', lineHeight: '1.85', marginBottom: '1.1rem' }}>
              Seu Fundador, <strong>Sr. Cícero</strong>, investiu em especialidades em eletrônicos e eletro-portáteis.
            </p>
            <p style={{ fontSize: '1.07rem', color: 'var(--text-main)', lineHeight: '1.85', marginBottom: '1.1rem' }}>
              Hoje somos <strong style={{ color: 'var(--primary-cyan)' }}>líderes em manutenção de aparelhos eletroeletrônicos</strong>. Prestamos atendimento a clientes e lojistas, somos autorizados das mais renomadas marcas, trabalhamos com manutenção, reparos e vendas de acessórios eletrônicos, além de atendimento em domicílio, entre outros.
            </p>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-cyan)', marginTop: '1.5rem', letterSpacing: '0.02em' }}>
              ⚡ Aguardamos a sua visita!
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <MapPin size={26} />
              </div>
              <div>
                <h4>Localização</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Rua Vinte e Oito de Setembro, 723 - Centro / Jardim Santa Maria Goretti, Cajuru - SP.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <ShoppingBag size={26} />
              </div>
              <div>
                <h4>Comércio & Peças</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Controles remotos para todas as marcas de TV, conectores, cabos, fontes e acessórios.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={26} />
              </div>
              <div>
                <h4>Garantia em Reparos</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Conserto de TVs, micro-ondas, secadores e eletrodomésticos executados com total garantia.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Award size={26} />
              </div>
              <div>
                <h4>Equipe Qualificada</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Técnicos experientes no diagnóstico de placas e componentes eletrônicos em geral.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Phone size={26} />
              </div>
              <div>
                <h4>Canais de Contato</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Telefone fixo (16) 3667-1944 e WhatsApp (16) 99170-7657 à sua disposição.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <CreditCard size={26} />
              </div>
              <div>
                <h4>Preço Justo</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Orçamentos sem compromisso e várias opções de pagamento facilitado no cartão.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="services-section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge"><Star size={14} fill="#f59e0b" color="#f59e0b" /> Avaliações de Clientes</div>
            <h2>Quem Compra e Conserta na Eletrônica Rayos Recomenda</h2>
            <p>Depoimentos de clientes de Cajuru-SP.</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic' }}>
                "Levei meu micro-ondas e o secador de cabelo da minha esposa na Eletrônica Rayos. Consertaram tudo rápido com preço justo!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#040914' }}>
                  JM
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>José Maria S.</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cajuru - SP</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic' }}>
                "Troquei os LEDs da minha Smart TV e ficou perfeita! Atendimento rápido tanto pelo telefone fixo quanto pelo WhatsApp."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-neon)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#040914' }}>
                  AC
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>Antônio Carlos F.</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cajuru - SP</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic' }}>
                "Comprei o controle da minha TV e mandei arrumar a caixa de som. Atendimento excelente da Eletrônica Rayos!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
                  RC
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>Regina Célia M.</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cajuru - SP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="services-section">
        <div className="container">
          <div className="section-header">
            <div className="badge"><HelpCircle size={14} /> Tira-Dúvidas</div>
            <h2>Perguntas Frequentes sobre Serviços & Produtos</h2>
            <p>Esclareça suas dúvidas antes de comprar na loja ou agendar o conserto do seu aparelho.</p>
          </div>

          <div className="faq-list">
            {[
              {
                q: 'Quais aparelhos a Eletrônica Rayos conserta?',
                a: 'Somos especializados exclusivamente em conserto e manutenção de eletroeletrônicos e eletrodomésticos, incluindo televisores (Smart TV LED/OLED/4K), micro-ondas, secadores de cabelo, pranchas, aparelhos de som, caixas amplificadas e placas eletrônicas.'
              },
              {
                q: 'Qual o WhatsApp e telefone fixo da Eletrônica Rayos?',
                a: 'Nosso WhatsApp oficial é (16) 99170-7657 e nosso telefone fixo é (16) 3667-1944. Estamos sempre prontos para atender você!'
              },
              {
                q: 'Qual o endereço exato da loja em Cajuru-SP?',
                a: 'Estamos localizados na Rua Vinte e Oito de Setembro, 723 - Centro / Jardim Santa Maria Goretti, Cajuru - SP.'
              },
              {
                q: 'Quais são as redes sociais oficiais da Eletrônica Rayos?',
                a: 'Você pode nos acompanhar pelo Instagram (@eletronica_rayos) e pela nossa página oficial no Facebook (facebook.com/RayosTec).'
              },
              {
                q: 'O orçamento para reparos em aparelhos é gratuito?',
                a: 'Sim! Diagnóstico e orçamento são avaliados sem compromisso em nossa loja. Você só autoriza o serviço se concordar com as condições.'
              }
            ].map((faq, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  {activeFaq === index ? <ChevronUp size={20} className="gradient-text" /> : <ChevronDown size={20} />}
                </button>
                {activeFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section id="contato" className="services-section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge"><MapPin size={14} /> Atendimento em Cajuru - SP</div>
            <h2>Entre em Contato com a Eletrônica Rayos</h2>
            <p>Visite nossa loja física ou ligue para nossa equipe de atendimento em Cajuru-SP.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-card">
              <div className="contact-item">
                <div className="contact-icon"><MapPin size={22} /></div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.05rem' }}>Endereço da Loja Física</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Rua Vinte e Oito de Setembro, 723<br />
                    Centro / Jardim Santa Maria Goretti<br />
                    Cajuru - SP - CEP: 14240-000
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Phone size={22} /></div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.05rem' }}>Telefone Fixo & WhatsApp</h4>
                  <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-cyan)', margin: '0.2rem 0' }}>
                    Telefone Fixo: <a href="tel:1636671944" style={{ color: 'inherit' }}>(16) 3667-1944</a>
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    WhatsApp: <a href={buildWhatsappLink('Olá Eletrônica Rayos!')} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-neon)', fontWeight: 700 }}>(16) 99170-7657</a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Mail size={22} /></div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.05rem' }}>Redes Sociais Oficiais</h4>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <a
                      href={instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <InstagramIcon size={16} /> Instagram
                    </a>
                    <a
                      href={facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <FacebookIcon size={16} /> Facebook
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '1rem' }}>
                <a
                  href={buildWhatsappLink('Olá Eletrônica Rayos! Gostaria de um orçamento.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ flex: 1 }}
                >
                  <MessageSquare size={18} /> (16) 99170-7657
                </a>
                <a
                  href="tel:1636671944"
                  className="btn btn-outline"
                >
                  <Phone size={18} /> (16) 3667-1944
                </a>
              </div>
            </div>

            {/* Embedded Google Map for Cajuru/SP */}
            <div className="map-wrapper">
              <iframe
                title="Mapa Eletrônica Rayos Cajuru SP"
                className="map-iframe"
                src="https://maps.google.com/maps?q=Rua%20Vinte%20e%20Oito%20de%20Setembro,%20723,%20Cajuru%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand-logo" style={{ marginBottom: '1.25rem' }}>
                <img src={eletronicaRayosLogo} alt="Eletrônica Rayos Logo" className="brand-logo-img" />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Sua loja de produtos eletrônicos e assistência técnica em Cajuru-SP. Conserto de eletroeletrônicos, TVs, micro-ondas, secadores, controles e acessórios.
              </p>
              <div className="badge badge-neon">Cajuru - SP | CEP 14240-000</div>
            </div>

            <div className="footer-col">
              <h4>Serviços & Produtos</h4>
              <ul className="footer-links">
                <li><a href="#servicos">Conserto de TVs & Monitores</a></li>
                <li><a href="#servicos">Manutenção de Micro-ondas & Secadores</a></li>
                <li><a href="#servicos">Aparelhos de Som & Caixas Amplificadas</a></li>
                <li><a href="#loja">Controles Remotos Universal & Smart</a></li>
                <li><a href="#loja">Cabos, Adaptadores & Fontes</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Redes Sociais</h4>
              <ul className="footer-links">
                <li><a href={instagramLink} target="_blank" rel="noopener noreferrer">📷 Instagram (@eletronica_rayos)</a></li>
                <li><a href={facebookLink} target="_blank" rel="noopener noreferrer">📘 Facebook (RayosTec)</a></li>
                <li><a href={buildWhatsappLink('Olá!')} target="_blank" rel="noopener noreferrer">💬 WhatsApp (16) 99170-7657</a></li>
                <li><a href="#contato">📍 Localização & Fone Fixo</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contato Cajuru/SP</h4>
              <ul className="footer-links">
                <li>📍 Rua Vinte e Oito de Setembro, 723 - Centro / Sta. Maria Goretti, Cajuru-SP</li>
                <li>📞 Fixo: (16) 3667-1944</li>
                <li>💬 WhatsApp: (16) 99170-7657</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 <strong>Eletrônica Rayos</strong>. Rua Vinte e Oito de Setembro, 723 - Cajuru/SP.</p>
            <p>Comércio e Conserto de Eletroeletrônicos ⚡</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="floating-actions">
        {/* Facebook floating button */}
        <a
          href={facebookLink}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn"
          style={{ background: '#1877F2' }}
          title="Facebook Eletrônica Rayos"
        >
          <FacebookIcon size={24} />
        </a>

        {/* Instagram floating button */}
        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-instagram"
          title="Instagram Eletrônica Rayos"
        >
          <InstagramIcon size={24} />
        </a>

        {/* WhatsApp floating button */}
        <a
          href={buildWhatsappLink('Olá Eletrônica Rayos! Preciso de ajuda com um conserto ou produto.')}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-whatsapp"
          title="Falar no WhatsApp (16) 99170-7657"
        >
          <MessageSquare size={26} />
          <span className="badge-dot"></span>
        </a>
      </div>

      {/* Live Social Proof Toast */}
      {toastMessage && (
        <div className="live-toast">
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(0, 255, 135, 0.2)', border: '1px solid var(--accent-neon)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-neon)', flexShrink: 0 }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-neon)', fontWeight: 700, textTransform: 'uppercase' }}>Eletrônica Rayos Cajuru</div>
            <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 500 }}>{toastMessage}</div>
          </div>
        </div>
      )}

      {/* Chat Assistant Widget Toggle */}
      {chatModalOpen && (
        <div className="chat-modal-overlay">
          <div className="chat-modal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} />
              <span>Eletrônica Rayos Atendimento</span>
            </div>
            <button
              onClick={() => setChatModalOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#040914', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
          <div className="chat-modal-body">
            <div className="chat-bubble">
              Olá! 👋 Bem-vindo à <strong>Eletrônica Rayos</strong> em Cajuru-SP! Fale conosco pelo WhatsApp (16) 99170-7657 ou telefone (16) 3667-1944!
            </div>
            <a
              href={buildWhatsappLink('Olá Eletrônica Rayos! Gostaria de tirar uma dúvida sobre consertos ou produtos.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%' }}
            >
              <Send size={16} /> WhatsApp (16) 99170-7657
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
