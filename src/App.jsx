import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ArrowRight, Menu, X, Shield, TrendingUp, Zap, 
  CheckCircle, Star, Wallet, Copy, Bell, Globe,
  ChevronDown, Key, UserCheck, MessageSquare, GitBranch,
  Upload, Camera, Plus, Search, Filter, Eye, BarChart3,
  FileText, Calendar, DollarSign, Clock, Users, Award,
  Heart, Activity, Phone, Mail, MapPin, HelpCircle,
  ExternalLink, Download, AlertCircle, Info, Settings,
  Target, Layers, Smartphone, Lock, CheckSquare, Timer,
  PieChart, Calculator, TrendingDown, Percent, Database,
  ScanLine, FileSearch, RefreshCw, ShieldCheck, Hash,
  Loader2, Sparkles, Rocket, Moon, Sun, BarChart, 
  LineChart, Volume2, Pause, Play, AlertTriangle,
  Mic, MicOff, Image, Folder, Cloud, Cpu, Send,
  Brain, Gauge, Microscope, Coins, CreditCard,
  BookOpen, Lightbulb, Briefcase, Building, Languages,
  Headphones, Monitor, Wifi, Radio, Speaker, Disc
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart as RechartsPieChart, Cell, BarChart as RechartsBarChart, Bar, ComposedChart, RadialBarChart, RadialBar } from 'recharts';

function App() {
  // =================== 상태 관리 ===================
  const [currentPage, setCurrentPage] = useState('landing');
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [particles, setParticles] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [hologramActive, setHologramActive] = useState(false);
  const [neuralNetworkActive, setNeuralNetworkActive] = useState(false);

  // =================== 다국어 시스템 ===================
  const translations = useMemo(() => ({
    en: {
      home: 'Home',
      marketplace: 'Marketplace',
      analytics: 'AI Analytics',
      portfolio: 'Portfolio',
      connectWallet: 'Connect Wallet',
      startTrading: 'Start Trading',
      hero: {
        badge: 'Next-Generation AI DeFi Insurance Platform',
        title1: 'Quantum AI-Powered',
        title2: 'Insurance Exchange',
        subtitle: 'Trade insurance policies with quantum-level AI valuation using advanced DCF, NPV, and IRR algorithms. Guaranteed returns exceeding surrender value with neural network risk analysis.',
        cta1: 'Launch Quantum Trading',
        cta2: 'Explore AI Marketplace'
      },
      features: {
        aiEngine: 'Quantum AI Engine',
        ipfsNetwork: 'Decentralized Storage',
        web3Wallet: 'Web3 Wallet',
        aiReturns: 'AI-Optimized Returns',
        aboveSurrender: 'Above Surrender Value'
      },
      marketplace: {
        title: 'Quantum AI Insurance Marketplace',
        subtitle: 'Trade AI-verified policies with guaranteed superior returns',
        searchPlaceholder: 'Search quantum-verified policies...',
        surrenderValue: 'Surrender Value',
        ourPrice: 'Our Price',
        purchaseWithAI: 'Purchase with AI Analysis',
        aiVerified: 'AI Verified'
      },
      purchase: {
        title: 'Complete Your Investment',
        analyzing: 'Quantum AI Analyzing Investment...',
        riskAssessment: 'Risk Assessment Complete',
        smartContract: 'Smart Contract Ready',
        confirmPurchase: 'Confirm Purchase',
        processing: 'Processing Transaction...',
        success: 'Investment Successful!',
        viewPortfolio: 'View Portfolio'
      },
      ai: {
        confidence: 'Confidence',
        dcfValue: 'DCF Value',
        expectedIrr: 'Expected IRR',
        riskScore: 'Risk Score',
        profitVsSurrender: 'vs Surrender'
      }
    },
    ko: {
      home: '홈',
      marketplace: '마켓플레이스',
      analytics: 'AI 분석',
      portfolio: '포트폴리오',
      connectWallet: '지갑 연결',
      startTrading: '거래 시작',
      hero: {
        badge: '차세대 AI DeFi 보험 플랫폼',
        title1: '양자 AI 기반',
        title2: '보험 거래소',
        subtitle: '양자 수준의 AI 가치평가와 고급 DCF, NPV, IRR 알고리즘으로 보험 상품을 거래하세요. 신경망 리스크 분석으로 해지환급금을 초과하는 수익을 보장합니다.',
        cta1: '양자 거래 시작',
        cta2: 'AI 마켓플레이스 탐험'
      },
      features: {
        aiEngine: '양자 AI 엔진',
        ipfsNetwork: '분산 스토리지',
        web3Wallet: 'Web3 지갑',
        aiReturns: 'AI 최적화 수익',
        aboveSurrender: '해지환급금 초과'
      },
      marketplace: {
        title: '양자 AI 보험 마켓플레이스',
        subtitle: 'AI 검증 보험으로 우수한 수익률 보장',
        searchPlaceholder: '양자 검증 보험 상품 검색...',
        surrenderValue: '해지환급금',
        ourPrice: '당사 가격',
        purchaseWithAI: 'AI 분석으로 구매',
        aiVerified: 'AI 검증'
      },
      purchase: {
        title: '투자 완료하기',
        analyzing: '양자 AI 투자 분석 중...',
        riskAssessment: '리스크 평가 완료',
        smartContract: '스마트 계약 준비',
        confirmPurchase: '구매 확인',
        processing: '거래 처리 중...',
        success: '투자 성공!',
        viewPortfolio: '포트폴리오 보기'
      },
      ai: {
        confidence: '신뢰도',
        dcfValue: 'DCF 가치',
        expectedIrr: '예상 IRR',
        riskScore: '리스크 점수',
        profitVsSurrender: '해지환급금 대비'
      }
    }
  }), []);

  const getText = useCallback((path) => {
    const translation = translations[currentLanguage] || translations.en;
    const keys = path.split('.');
    let result = translation;
    
    for (const key of keys) {
      if (result && typeof result === 'object') {
        result = result[key];
      } else {
        return '';
      }
    }
    
    return typeof result === 'string' ? result : '';
  }, [currentLanguage, translations]);

  // =================== 비즈니스 로직 ===================
  const [web3State, setWeb3State] = useState({
    isConnected: false,
    account: null,
    balance: 0,
    network: null,
    networkName: '',
    isCorrectNetwork: false,
    isConnecting: false
  });

  const [valuationEngine, setValuationEngine] = useState({
    isInitialized: false,
    models: {
      dcf: { loaded: false, accuracy: 0 },
      npv: { loaded: false, accuracy: 0 },
      irr: { loaded: false, accuracy: 0 }
    }
  });

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [purchaseStep, setPurchaseStep] = useState(1);
  const [purchaseData, setPurchaseData] = useState({
    analysis: null,
    riskAssessment: null,
    contractTerms: null
  });

  const [userPortfolio, setUserPortfolio] = useState({
    totalValue: 0,
    totalInvested: 0,
    totalReturns: 0,
    policies: []
  });

  const [chartData] = useState([
    { time: '00:00', price: 45000, volume: 120, aiValue: 52000 },
    { time: '04:00', price: 46200, volume: 98, aiValue: 53100 },
    { time: '08:00', price: 47500, volume: 156, aiValue: 54200 },
    { time: '12:00', price: 48200, volume: 187, aiValue: 55300 },
    { time: '16:00', price: 49100, volume: 145, aiValue: 56100 },
    { time: '20:00', price: 48500, volume: 167, aiValue: 55800 }
  ]);

  const policies = useMemo(() => [
    {
      id: 'WS001',
      type: 'endowment',
      company: 'AIA Hong Kong',
      productName: 'Premier Wealth Builder',
      annualPremium: 50000,
      paidYears: 8,
      totalTerm: 25,
      surrenderValue: 442000,
      askingPrice: 65000,
      aiValuation: {
        dcfValue: 672000,
        riskScore: 0.18,
        expectedIRR: 0.087,
        confidenceScore: 0.91
      },
      verified: true,
      region: 'Hong Kong'
    },
    {
      id: 'WS002',
      type: 'critical_illness',
      company: 'Prudential Singapore',
      productName: 'PRUactive Protect Plus',
      annualPremium: 35000,
      paidYears: 10,
      surrenderValue: 238000,
      askingPrice: 45000,
      aiValuation: {
        dcfValue: 385000,
        riskScore: 0.24,
        expectedIRR: 0.076,
        confidenceScore: 0.85
      },
      verified: true,
      region: 'Singapore'
    }
  ], []);

  // =================== 궁극의 테마 시스템 ===================
  const getThemeStyles = useCallback(() => {
    const premiumColors = {
      // 1조원급 그라디언트 컬렉션
      ultraGradient: isDarkMode 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)'
        : 'linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #ffecd2 50%, #fcb69f 75%, #667eea 100%)',
      
      quantumGradient: isDarkMode
        ? 'linear-gradient(135deg, #8360c3 0%, #2ebf91 25%, #ffd89b 50%, #19547b 75%, #667eea 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #667eea 50%, #764ba2 75%, #667eea 100%)',
      
      neuralGradient: isDarkMode
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)'
        : 'linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #4facfe 50%, #00f2fe 75%, #667eea 100%)',
        
      // 궁극의 색상 팔레트
      primary: isDarkMode ? '#667eea' : '#5a67d8',
      secondary: isDarkMode ? '#764ba2' : '#667eea',
      accent: isDarkMode ? '#f093fb' : '#ed64a6',
      success: isDarkMode ? '#2ebf91' : '#38a169',
      warning: isDarkMode ? '#ffd89b' : '#dd6b20',
      error: isDarkMode ? '#f5576c' : '#e53e3e',
      
      // 궁극의 배경
      background: isDarkMode 
        ? 'radial-gradient(ellipse at top left, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 25%, rgba(0, 0, 0, 0.9) 50%, rgba(240, 147, 251, 0.05) 75%, rgba(0, 0, 0, 1) 100%)'
        : 'radial-gradient(ellipse at top left, rgba(168, 237, 234, 0.3) 0%, rgba(254, 214, 227, 0.2) 25%, rgba(255, 255, 255, 0.95) 50%, rgba(252, 182, 159, 0.2) 75%, rgba(255, 255, 255, 1) 100%)',
      
      // 카드 배경
      cardBg: isDarkMode 
        ? 'rgba(16, 16, 20, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)',
      cardBgSecondary: isDarkMode
        ? 'rgba(26, 26, 35, 0.9)'
        : 'rgba(248, 250, 252, 0.9)',
      
      // 텍스트 색상
      textPrimary: isDarkMode ? '#ffffff' : '#1a202c',
      textSecondary: isDarkMode ? '#e2e8f0' : '#4a5568',
      textMuted: isDarkMode ? '#a0aec0' : '#718096',
      
      // 보더
      borderColor: isDarkMode ? 'rgba(102, 126, 234, 0.2)' : 'rgba(90, 103, 216, 0.2)',
      borderColorLight: isDarkMode ? 'rgba(118, 75, 162, 0.15)' : 'rgba(102, 126, 234, 0.15)',
      
      // 글래스 효과
      glassBg: isDarkMode 
        ? 'rgba(16, 16, 20, 0.8)' 
        : 'rgba(255, 255, 255, 0.8)',
      glassBlur: 'blur(40px)',
      
      // 궁극의 섀도우
      shadowSm: isDarkMode 
        ? '0 4px 20px rgba(102, 126, 234, 0.15)'
        : '0 2px 10px rgba(0, 0, 0, 0.1)',
      shadowMd: isDarkMode
        ? '0 10px 40px rgba(118, 75, 162, 0.2)'
        : '0 4px 20px rgba(0, 0, 0, 0.12)',
      shadowLg: isDarkMode
        ? '0 20px 60px rgba(240, 147, 251, 0.25)'
        : '0 10px 30px rgba(0, 0, 0, 0.15)',
      shadowXl: isDarkMode
        ? '0 30px 80px rgba(102, 126, 234, 0.3)'
        : '0 20px 50px rgba(0, 0, 0, 0.18)',
      
      // 글로우 효과
      glowPrimary: isDarkMode ? '0 0 40px rgba(102, 126, 234, 0.5)' : '0 0 30px rgba(90, 103, 216, 0.3)',
      glowSecondary: isDarkMode ? '0 0 40px rgba(118, 75, 162, 0.5)' : '0 0 30px rgba(102, 126, 234, 0.3)',
      glowAccent: isDarkMode ? '0 0 40px rgba(240, 147, 251, 0.5)' : '0 0 30px rgba(237, 100, 166, 0.3)',
      glowSuccess: isDarkMode ? '0 0 40px rgba(46, 191, 145, 0.5)' : '0 0 30px rgba(56, 161, 105, 0.3)'
    };
    
    return premiumColors;
  }, [isDarkMode]);

  // =================== 고급 사운드 시스템 ===================
  const playPremiumSound = useCallback((type) => {
    if (!audioEnabled) return;
    
    try {
      const audioContext = typeof window !== 'undefined' && window.AudioContext ? new window.AudioContext() : null;
      if (!audioContext) return;
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const frequencies = {
        success: [523.25, 659.25, 783.99], // C5, E5, G5
        error: [293.66, 246.94], // D4, B3
        info: [440, 554.37], // A4, C#5
        quantum: [523.25, 698.46, 880] // C5, F5, A5
      };
      
      const freq = frequencies[type] || frequencies.info;
      
      oscillator.frequency.setValueAtTime(freq[0], audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      // 사운드 실패시 무시
    }
  }, [audioEnabled]);

  // =================== 알림 시스템 ===================
  const addNotification = useCallback((message, type = 'info') => {
    const notification = {
      id: Date.now() + Math.random(),
      message,
      type,
      timestamp: new Date(),
      progress: 0
    };
    
    setNotifications(prev => [notification, ...prev].slice(0, 5));
    playPremiumSound(type);
    
    const progressInterval = setInterval(() => {
      setNotifications(prev => prev.map(n => 
        n.id === notification.id 
          ? { ...n, progress: Math.min(n.progress + 2, 100) }
          : n
      ));
    }, 80);
    
    setTimeout(() => {
      clearInterval(progressInterval);
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  }, [playPremiumSound]);

  // =================== 파티클 시스템 ===================
  const initializeParticles = useCallback(() => {
    const newParticles = [];
    for (let i = 0; i < 150; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: isDarkMode ? '#667eea' : '#5a67d8',
        glow: Math.random() * 15 + 10
      });
    }
    setParticles(newParticles);
  }, [isDarkMode]);

  const animateParticles = useCallback(() => {
    setParticles(prevParticles => 
      prevParticles.map(particle => {
        const newX = particle.x + particle.vx;
        const newY = particle.y + particle.vy;
        const maxWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const maxHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
        
        return {
          ...particle,
          x: newX > maxWidth ? 0 : newX < 0 ? maxWidth : newX,
          y: newY > maxHeight ? 0 : newY < 0 ? maxHeight : newY,
          opacity: Math.sin(Date.now() * 0.002 + particle.id) * 0.3 + 0.5
        };
      })
    );
  }, []);

  // =================== 3D 마우스 추적 ===================
  const handleMouseMove = useCallback((e) => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setRotateX(-y);
      setRotateY(x);
    }
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // =================== Web3 연결 ===================
  const connectWallet = useCallback(async () => {
    if (web3State.isConnecting) return;
    
    setWeb3State(prev => ({ ...prev, isConnecting: true }));
    
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        addNotification('❌ MetaMask not found. Please install MetaMask.', 'error');
        return;
      }

      addNotification('🔄 Connecting to MetaMask...', 'info');

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const [chainId, balance] = await Promise.all([
        window.ethereum.request({ method: 'eth_chainId' }),
        window.ethereum.request({ 
          method: 'eth_getBalance', 
          params: [accounts[0], 'latest'] 
        })
      ]);

      const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
      const networkName = chainId === '0x1' ? 'Ethereum Mainnet' : 'Other Network';

      setWeb3State({
        isConnected: true,
        account: accounts[0],
        balance: balanceInEth,
        network: chainId,
        networkName,
        isCorrectNetwork: true,
        isConnecting: false
      });

      setValuationEngine(prev => ({
        ...prev,
        isInitialized: true,
        models: {
          dcf: { loaded: true, accuracy: 0.947 },
          npv: { loaded: true, accuracy: 0.921 },
          irr: { loaded: true, accuracy: 0.898 }
        }
      }));

      setNeuralNetworkActive(true);
      addNotification(`✅ Connected: ${accounts[0].substr(0, 6)}...${accounts[0].substr(-4)}`, 'success');
      addNotification('🧠 Quantum AI Engine activated!', 'quantum');

    } catch (error) {
      addNotification(`❌ Connection failed: ${error.message}`, 'error');
      setWeb3State(prev => ({ ...prev, isConnecting: false, isConnected: false }));
    }
  }, [web3State.isConnecting, addNotification]);

  // =================== 구매 프로세스 ===================
  const startPurchaseProcess = useCallback(async (policy) => {
    if (!web3State.isConnected) {
      addNotification('Please connect your wallet first', 'error');
      return;
    }

    setSelectedPolicy(policy);
    setPurchaseStep(1);
    setCurrentPage('purchase');
    setHologramActive(true);
    setIsLoading(true);
    
    addNotification(`🧠 ${getText('purchase.analyzing')}`, 'info');
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const aiAnalysis = {
      profitPotential: ((policy.aiValuation.dcfValue - policy.askingPrice) / policy.askingPrice * 100).toFixed(1),
      expectedReturns: (policy.aiValuation.expectedIRR * 100).toFixed(1),
      confidenceLevel: (policy.aiValuation.confidenceScore * 100).toFixed(1)
    };

    setPurchaseData(prev => ({ ...prev, analysis: aiAnalysis }));
    setPurchaseStep(2);
    addNotification('✅ Analysis complete', 'quantum');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const riskAssessment = {
      overallRisk: policy.aiValuation.riskScore < 0.2 ? 'Low' : 'Medium'
    };

    setPurchaseData(prev => ({ ...prev, riskAssessment }));
    setPurchaseStep(3);
    addNotification(`✅ ${getText('purchase.riskAssessment')}`, 'success');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const contractTerms = {
      escrowPeriod: '7 days',
      platformFee: '3%'
    };

    setPurchaseData(prev => ({ ...prev, contractTerms }));
    setPurchaseStep(4);
    addNotification(`✅ ${getText('purchase.smartContract')}`, 'success');
    setIsLoading(false);
    
  }, [web3State.isConnected, addNotification, getText]);

  const completePurchase = useCallback(async () => {
    if (!selectedPolicy) return;
    
    setIsLoading(true);
    addNotification(`🔄 ${getText('purchase.processing')}`, 'info');
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newPolicy = {
      ...selectedPolicy,
      purchaseDate: new Date(),
      purchasePrice: selectedPolicy.askingPrice,
      currentValue: selectedPolicy.aiValuation.dcfValue,
      unrealizedGains: selectedPolicy.aiValuation.dcfValue - selectedPolicy.askingPrice
    };

    setUserPortfolio(prev => {
      const newPolicies = [...prev.policies, newPolicy];
      const totalInvested = prev.totalInvested + selectedPolicy.askingPrice;
      const totalValue = prev.totalValue + selectedPolicy.aiValuation.dcfValue;
      const totalReturns = totalValue - totalInvested;

      return {
        totalValue,
        totalInvested,
        totalReturns,
        policies: newPolicies
      };
    });

    setPurchaseStep(5);
    setIsLoading(false);
    addNotification(`✅ ${getText('purchase.success')}`, 'success');
    
  }, [selectedPolicy, addNotification, getText]);

  // =================== 컴포넌트들 ===================
  const ParticleCanvas = () => {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}>
        {particles.map(particle => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              borderRadius: '50%',
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.1s linear',
              boxShadow: `0 0 ${particle.glow}px ${particle.color}`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>
    );
  };

  const Navigation = () => {
    const theme = getThemeStyles();
    
    return (
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: isScrolled ? theme.glassBg : 'transparent',
        backdropFilter: isScrolled ? theme.glassBlur : 'none',
        borderBottom: isScrolled ? `1px solid ${theme.borderColorLight}` : 'none',
        boxShadow: isScrolled ? theme.shadowXl : 'none'
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 40px',
          height: '90px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* 로고 */}
          <div 
            style={{
              fontSize: '36px',
              fontWeight: '900',
              background: theme.ultraGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              letterSpacing: '-0.04em'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 30px rgba(102, 126, 234, 0.8))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'none';
            }}
            onClick={() => setCurrentPage('landing')}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '20px',
              background: theme.quantumGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: theme.glowPrimary,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Brain size={30} style={{color: 'white'}} />
              {neuralNetworkActive && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                  animation: 'shimmer 2s ease-in-out infinite'
                }} />
              )}
            </div>
            WellSwap
            {neuralNetworkActive && (
              <div style={{
                fontSize: '12px',
                color: theme.success,
                fontWeight: '700',
                backgroundColor: theme.success + '20',
                padding: '4px 8px',
                borderRadius: '6px',
                animation: 'pulse 2s infinite'
              }}>
                QUANTUM
              </div>
            )}
          </div>
          
          {/* 네비게이션 메뉴 */}
          <div style={{display: 'flex', alignItems: 'center', gap: '50px'}}>
            {[
              { key: 'home', label: getText('home'), page: 'landing', icon: Monitor },
              { key: 'marketplace', label: getText('marketplace'), page: 'marketplace', icon: Globe },
              { key: 'portfolio', label: getText('portfolio'), page: 'portfolio', icon: Briefcase },
              { key: 'analytics', label: getText('analytics'), page: 'analytics', icon: BarChart3 }
            ].map((item) => (
              <div 
                key={item.key}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  fontWeight: '800',
                  fontSize: '18px',
                  color: currentPage === item.page ? theme.primary : theme.textSecondary,
                  transition: 'all 0.4s ease',
                  padding: '15px 25px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.primary;
                  e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(102, 126, 234, 0.15)' : 'rgba(90, 103, 216, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = theme.shadowMd;
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== item.page) {
                    e.currentTarget.style.color = theme.textSecondary;
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => setCurrentPage(item.page)}
              >
                <item.icon size={20} />
                {item.label}
                {currentPage === item.page && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40px',
                    height: '5px',
                    background: theme.ultraGradient,
                    borderRadius: '5px',
                    boxShadow: theme.glowPrimary
                  }} />
                )}
              </div>
            ))}
          </div>
          
          {/* 우측 컨트롤 */}
          <div style={{display: 'flex', alignItems: 'center', gap: '25px'}}>
            {/* 언어 토글 */}
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              style={{
                padding: '12px 20px',
                paddingRight: '45px',
                borderRadius: '20px',
                border: `2px solid ${theme.borderColor}`,
                backgroundColor: theme.cardBg,
                color: theme.textPrimary,
                fontSize: '16px',
                fontWeight: '800',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23667eea' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 15px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20px',
                transition: 'all 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = theme.primary;
                e.target.style.boxShadow = theme.glowPrimary;
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = theme.borderColor;
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="en">🇺🇸 English</option>
              <option value="ko">🇰🇷 한국어</option>
            </select>

            {/* AI 상태 */}
            {valuationEngine.isInitialized && (
              <div style={{
                padding: '12px 25px',
                background: theme.neuralGradient,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '900',
                boxShadow: theme.glowSuccess,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <Brain size={20} />
                Quantum AI Ready
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'shimmer 3s ease-in-out infinite'
                }} />
              </div>
            )}

            {/* 테마 토글 */}
            <button
              style={{
                width: '55px',
                height: '55px',
                borderRadius: '20px',
                border: 'none',
                background: theme.cardBgSecondary,
                color: theme.textPrimary,
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: theme.shadowMd
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.15) translateY(-3px)';
                e.target.style.backgroundColor = theme.primary;
                e.target.style.color = 'white';
                e.target.style.boxShadow = theme.glowPrimary;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = theme.cardBgSecondary;
                e.target.style.color = theme.textPrimary;
                e.target.style.boxShadow = theme.shadowMd;
              }}
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                addNotification(`${!isDarkMode ? '🌙' : '☀️'} Theme switched`, 'info');
              }}
            >
              {isDarkMode ? <Sun size={26} /> : <Moon size={26} />}
            </button>

            {/* 오디오 토글 */}
            <button
              style={{
                width: '55px',
                height: '55px',
                borderRadius: '20px',
                border: 'none',
                background: audioEnabled ? theme.quantumGradient : theme.cardBgSecondary,
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: audioEnabled ? theme.glowSecondary : theme.shadowMd
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.15) translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
              onClick={() => {
                setAudioEnabled(!audioEnabled);
                addNotification(`🔊 Audio ${!audioEnabled ? 'enabled' : 'disabled'}`, 'quantum');
              }}
            >
              {audioEnabled ? <Volume2 size={26} /> : <MicOff size={26} />}
            </button>
            
            {/* 지갑 연결 */}
            {!web3State.isConnected ? (
              <button
                style={{
                  padding: '16px 35px',
                  borderRadius: '25px',
                  border: 'none',
                  background: theme.ultraGradient,
                  color: 'white',
                  fontWeight: '900',
                  fontSize: '17px',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: theme.glowPrimary,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.08) translateY(-4px)';
                  e.target.style.boxShadow = theme.shadowXl;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = theme.glowPrimary;
                }}
                onClick={connectWallet}
                disabled={web3State.isConnecting}
              >
                {web3State.isConnecting ? (
                  <Loader2 size={22} style={{animation: 'spin 1s linear infinite'}} />
                ) : (
                  <Wallet size={22} />
                )}
                <span>{web3State.isConnecting ? 'Connecting...' : getText('connectWallet')}</span>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'shimmer 2s ease-in-out infinite'
                }} />
              </button>
            ) : (
              <div style={{display: 'flex', alignItems: 'center', gap: '25px'}}>
                <div style={{
                  background: theme.cardBg,
                  border: `2px solid ${theme.success}60`,
                  borderRadius: '25px',
                  padding: '16px 25px',
                  boxShadow: theme.glowSuccess,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: theme.success,
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite',
                      boxShadow: theme.glowSuccess
                    }} />
                    <div>
                      <div style={{
                        fontSize: '17px', 
                        fontWeight: '900', 
                        color: theme.textPrimary
                      }}>
                        {web3State.account?.substr(0, 6)}...{web3State.account?.substr(-4)}
                      </div>
                      <div style={{
                        fontSize: '13px', 
                        color: theme.textSecondary, 
                        fontWeight: '700'
                      }}>
                        {web3State.balance?.toFixed(4)} ETH
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  style={{
                    padding: '16px 30px',
                    background: theme.quantumGradient,
                    border: 'none',
                    borderRadius: '25px',
                    color: 'white',
                    fontWeight: '900',
                    fontSize: '17px',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    boxShadow: theme.glowSecondary
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.08) translateY(-3px)';
                    e.target.style.boxShadow = theme.shadowXl;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = theme.glowSecondary;
                  }}
                  onClick={() => setCurrentPage('marketplace')}
                >
                  {getText('startTrading')}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  };

  const LandingPage = () => {
    const theme = getThemeStyles();
    
    return (
      <div style={{
        minHeight: '100vh',
        background: theme.background,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <ParticleCanvas />
        
        {/* 백그라운드 요소들 */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '1000px',
          height: '1000px',
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.15) 50%, transparent 80%)'
            : 'radial-gradient(circle, rgba(168, 237, 234, 0.3) 0%, rgba(254, 214, 227, 0.2) 50%, transparent 80%)',
          borderRadius: '50%',
          filter: 'blur(200px)',
          animation: 'float 30s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: '900px',
          height: '900px',
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(240, 147, 251, 0.18) 0%, rgba(245, 87, 108, 0.12) 50%, transparent 80%)'
            : 'radial-gradient(circle, rgba(252, 182, 159, 0.25) 0%, rgba(255, 236, 210, 0.15) 50%, transparent 80%)',
          borderRadius: '50%',
          filter: 'blur(150px)',
          animation: 'float 35s ease-in-out infinite reverse'
        }} />

        <div style={{
          paddingTop: '150px',
          paddingBottom: '120px',
          paddingLeft: '40px',
          paddingRight: '40px',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{maxWidth: '1600px', margin: '0 auto'}}>
            <div style={{
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(750px, 1fr))', 
              gap: '120px', 
              alignItems: 'center'
            }}>
              {/* 히어로 콘텐츠 */}
              <div style={{
                display: 'flex', 
                flexDirection: 'column', 
                gap: '70px'
              }}>
                {/* 배지 */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: theme.cardBg,
                  backdropFilter: theme.glassBlur,
                  border: `2px solid ${theme.primary}40`,
                  borderRadius: '50px',
                  padding: '20px 40px',
                  color: theme.primary,
                  fontWeight: '800',
                  boxShadow: `${theme.shadowMd}, ${theme.glowPrimary}`,
                  maxWidth: 'fit-content',
                  fontSize: '18px',
                  animation: 'slideInFromLeft 0.8s ease-out',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent)',
                    animation: 'shimmer 4s ease-in-out infinite'
                  }} />
                  <Brain size={26} style={{marginRight: '15px'}} />
                  {getText('hero.badge')}
                  <Sparkles size={22} style={{marginLeft: '10px', animation: 'pulse 2s infinite'}} />
                </div>
                
                {/* 메인 타이틀 */}
                <div style={{animation: 'slideInFromLeft 0.8s ease-out 0.2s both'}}>
                  <h1 style={{
                    fontSize: '96px',
                    fontWeight: '900',
                    color: theme.textPrimary,
                    lineHeight: '0.9',
                    margin: 0,
                    letterSpacing: '-0.06em'
                  }}>
                    <span style={{
                      background: theme.ultraGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'block',
                      marginBottom: '25px',
                      filter: 'drop-shadow(0 0 30px rgba(102, 126, 234, 0.4))'
                    }}>
                      {getText('hero.title1')}
                    </span>
                    <span style={{
                      color: theme.textPrimary,
                      textShadow: isDarkMode ? '0 0 50px rgba(255, 255, 255, 0.15)' : '0 0 50px rgba(0, 0, 0, 0.15)'
                    }}>
                      {getText('hero.title2')}
                    </span>
                  </h1>
                  
                  <p style={{
                    fontSize: '30px',
                    color: theme.textSecondary,
                    lineHeight: '1.6',
                    maxWidth: '750px',
                    margin: '50px 0 0 0',
                    fontWeight: '600'
                  }}>
                    {getText('hero.subtitle')}
                  </p>
                </div>
                
                {/* CTA 버튼들 */}
                <div style={{
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '30px', 
                  alignItems: 'flex-start',
                  animation: 'slideInFromLeft 0.8s ease-out 0.4s both'
                }}>
                  <button 
                    style={{
                      padding: '28px 50px',
                      borderRadius: '30px',
                      border: 'none',
                      background: theme.ultraGradient,
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      transition: 'all 0.5s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      boxShadow: `${theme.shadowLg}, ${theme.glowPrimary}`,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.08) translateY(-5px)';
                      e.target.style.boxShadow = `${theme.shadowXl}, ${theme.glowPrimary}`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = `${theme.shadowLg}, ${theme.glowPrimary}`;
                    }}
                    onClick={() => web3State.isConnected ? setCurrentPage('marketplace') : connectWallet()}
                    disabled={web3State.isConnecting}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      animation: 'shimmer 3s ease-in-out infinite'
                    }} />
                    {web3State.isConnecting ? (
                      <Loader2 size={30} style={{animation: 'spin 1s linear infinite'}} />
                    ) : web3State.isConnected ? (
                      <Brain size={30} />
                    ) : (
                      <Wallet size={30} />
                    )}
                    <span>
                      {web3State.isConnecting ? 'Quantum Connecting...' : 
                       web3State.isConnected ? getText('hero.cta1') : getText('connectWallet')}
                    </span>
                    <ArrowRight size={30} />
                  </button>
                  
                  <button 
                    style={{
                      padding: '28px 50px',
                      borderRadius: '30px',
                      border: `3px solid ${theme.borderColor}`,
                      backgroundColor: theme.cardBg,
                      backdropFilter: theme.glassBlur,
                      color: theme.textPrimary,
                      fontSize: '24px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      transition: 'all 0.5s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.08) translateY(-5px)';
                      e.target.style.boxShadow = `${theme.shadowLg}, ${theme.glowSecondary}`;
                      e.target.style.borderColor = theme.secondary;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.borderColor = theme.borderColor;
                    }}
                    onClick={() => setCurrentPage('marketplace')}
                  >
                    <Eye size={30} />
                    <span>{getText('hero.cta2')}</span>
                    <Sparkles size={26} style={{animation: 'pulse 2s infinite'}} />
                  </button>
                </div>
                
                {/* 기능 카드들 */}
                <div style={{
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '40px', 
                  paddingTop: '70px',
                  animation: 'slideInFromLeft 0.8s ease-out 0.6s both'
                }}>
                  {[
                    { 
                      icon: Brain, 
                      label: getText('features.aiEngine'), 
                      desc: `${valuationEngine.isInitialized ? 'Quantum Active' : 'Ready'}`, 
                      color: theme.primary, 
                      value: valuationEngine.isInitialized ? '94.7% Accuracy' : 'Ready',
                      status: valuationEngine.isInitialized
                    },
                    { 
                      icon: Database, 
                      label: getText('features.ipfsNetwork'), 
                      desc: 'Distributed Quantum Storage', 
                      color: theme.success, 
                      value: 'Connected',
                      status: true
                    },
                    { 
                      icon: Wallet, 
                      label: getText('features.web3Wallet'), 
                      desc: `${web3State.isConnected ? 'Connected' : 'Ready'}`, 
                      color: theme.secondary, 
                      value: web3State.isConnected ? '✓ Active' : 'Ready',
                      status: web3State.isConnected
                    },
                    { 
                      icon: TrendingUp, 
                      label: getText('features.aiReturns'), 
                      desc: getText('features.aboveSurrender'), 
                      color: theme.warning, 
                      value: '+18.7%',
                      status: true
                    }
                  ].map((feature, idx) => (
                    <div key={idx} style={{
                      padding: '40px',
                      backgroundColor: theme.cardBg,
                      backdropFilter: theme.glassBlur,
                      borderRadius: '30px',
                      border: `3px solid ${feature.status ? feature.color + '50' : theme.borderColor}`,
                      transition: 'all 0.5s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                      e.currentTarget.style.boxShadow = `0 30px 60px ${feature.color}30, 0 0 40px ${feature.color}50`;
                      e.currentTarget.style.borderColor = feature.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = feature.status ? feature.color + '50' : theme.borderColor;
                    }}>
                      
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(90deg, transparent, ${feature.color}15, transparent)`,
                        animation: feature.status ? 'shimmer 3s ease-in-out infinite' : 'none'
                      }} />
                      
                      <div style={{
                        width: '70px',
                        height: '70px',
                        backgroundColor: feature.color + '25',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 0 25px 0',
                        position: 'relative',
                        border: feature.status ? `4px solid ${feature.color}` : `4px solid ${theme.borderColor}`
                      }}>
                        <feature.icon size={35} style={{color: feature.color}} />
                        {feature.status && (
                          <div style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            width: '25px',
                            height: '25px',
                            backgroundColor: feature.color,
                            borderRadius: '50%',
                            border: '4px solid white',
                            animation: 'pulse 2s infinite',
                            boxShadow: `0 0 15px ${feature.color}`
                          }} />
                        )}
                      </div>
                      <div style={{fontWeight: '900', color: theme.textPrimary, marginBottom: '10px', fontSize: '22px'}}>
                        {feature.label}
                      </div>
                      <div style={{fontSize: '16px', color: theme.textSecondary, fontWeight: '700', marginBottom: '10px'}}>
                        {feature.desc}
                      </div>
                      <div style={{fontSize: '18px', color: feature.color, fontWeight: '800'}}>
                        {feature.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 대시보드 */}
              <div style={{
                position: 'relative',
                animation: 'slideInFromRight 0.8s ease-out 0.8s both'
              }}>
                <div style={{
                  backgroundColor: theme.cardBg,
                  backdropFilter: theme.glassBlur,
                  borderRadius: '50px',
                  padding: '60px',
                  border: `3px solid ${theme.borderColor}`,
                  boxShadow: `${theme.shadowXl}, ${theme.glowPrimary}`,
                  position: 'relative',
                  overflow: 'hidden',
                  transform: `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(102, 126, 234, 0.08) 50%, transparent 70%)',
                    animation: hologramActive ? 'shimmer 2s ease-in-out infinite' : 'none'
                  }} />
                  
                  <div style={{textAlign: 'center', marginBottom: '50px'}}>
                    <h3 style={{
                      fontSize: '32px', 
                      fontWeight: '900', 
                      color: theme.textPrimary, 
                      marginBottom: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '20px'
                    }}>
                      <Brain size={38} style={{color: theme.primary}} />
                      Quantum AI Analytics
                      <Sparkles size={28} style={{color: theme.success, animation: 'pulse 2s infinite'}} />
                    </h3>
                  </div>

                  <div style={{marginBottom: '50px', height: '400px', position: 'relative'}}>
                    <div style={{
                      position: 'absolute',
                      top: '25px',
                      right: '25px',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      backgroundColor: theme.cardBg,
                      padding: '15px 20px',
                      borderRadius: '20px',
                      border: `3px solid ${theme.success}60`,
                      backdropFilter: theme.glassBlur,
                      boxShadow: theme.glowSuccess
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: theme.success,
                        borderRadius: '50%',
                        animation: 'pulse 1s infinite',
                        boxShadow: theme.glowSuccess
                      }} />
                      <span style={{fontSize: '16px', fontWeight: '900', color: theme.success}}>
                        QUANTUM LIVE
                      </span>
                    </div>
                    
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={theme.primary} stopOpacity={0.9}/>
                            <stop offset="95%" stopColor={theme.primary} stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={theme.success} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={theme.success} stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 4" stroke={theme.borderColor} opacity={0.5} />
                        <XAxis 
                          dataKey="time" 
                          stroke={theme.textSecondary} 
                          fontSize={15}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          yAxisId="left"
                          stroke={theme.textSecondary} 
                          fontSize={15}
                          tickLine={false}
                          axisLine={false}
                          domain={['dataMin - 1000', 'dataMax + 1000']}
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          stroke={theme.textSecondary} 
                          fontSize={15}
                          tickLine={false}
                          axisLine={false}
                          domain={[0, 'dataMax + 50']}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: theme.cardBg,
                            border: `3px solid ${theme.borderColor}`,
                            borderRadius: '20px',
                            backdropFilter: theme.glassBlur,
                            boxShadow: theme.shadowXl,
                            fontSize: '16px'
                          }}
                          labelStyle={{color: theme.textPrimary, fontWeight: '800'}}
                        />
                        <Area 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="price" 
                          stroke={theme.primary} 
                          fillOpacity={1} 
                          fill="url(#colorPrice)"
                          strokeWidth={5}
                          name="Market Price"
                          dot={{ fill: theme.primary, strokeWidth: 4, r: 5 }}
                          activeDot={{ r: 10, stroke: theme.primary, strokeWidth: 4, fill: 'white' }}
                        />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="aiValue" 
                          stroke={theme.success} 
                          strokeWidth={5}
                          strokeDasharray="12 6"
                          dot={{ fill: theme.success, strokeWidth: 4, r: 6 }}
                          activeDot={{ r: 10, stroke: theme.success, strokeWidth: 4, fill: 'white' }}
                          name="Quantum AI Value"
                        />
                        <Bar 
                          yAxisId="right"
                          dataKey="volume" 
                          fill={theme.primary + '50'}
                          name="Volume"
                          opacity={0.7}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '25px',
                    marginBottom: '50px'
                  }}>
                    <div style={{
                      padding: '30px',
                      background: theme.ultraGradient,
                      borderRadius: '25px',
                      textAlign: 'center',
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                        animation: 'shimmer 3s ease-in-out infinite'
                      }} />
                      <div style={{fontSize: '16px', fontWeight: '800', marginBottom: '12px', opacity: 0.95}}>
                        Quantum AI Predicted
                      </div>
                      <div style={{fontSize: '32px', fontWeight: '900'}}>
                        ${chartData[chartData.length - 1]?.aiValue?.toLocaleString() || '55,800'}
                      </div>
                      <div style={{fontSize: '16px', fontWeight: '800', marginTop: '12px', opacity: 0.95}}>
                        +18.7% vs Market
                      </div>
                    </div>
                    <div style={{
                      padding: '30px',
                      background: theme.neuralGradient,
                      borderRadius: '25px',
                      textAlign: 'center',
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                        animation: 'shimmer 3s ease-in-out infinite'
                      }} />
                      <div style={{fontSize: '16px', fontWeight: '800', marginBottom: '12px', opacity: 0.95}}>
                        Neural {getText('ai.confidence')}
                      </div>
                      <div style={{fontSize: '32px', fontWeight: '900'}}>
                        94.7%
                      </div>
                      <div style={{fontSize: '16px', fontWeight: '800', marginTop: '12px', opacity: 0.95}}>
                        Quantum Accuracy
                      </div>
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: theme.cardBgSecondary,
                    borderRadius: '25px',
                    padding: '40px'
                  }}>
                    <h4 style={{
                      fontWeight: '900', 
                      color: theme.textPrimary, 
                      marginBottom: '30px', 
                      textAlign: 'center',
                      fontSize: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px'
                    }}>
                      <Cpu size={24} style={{color: theme.primary}} />
                      Quantum AI Valuation Models
                      <Sparkles size={20} style={{color: theme.success, animation: 'pulse 2s infinite'}} />
                    </h4>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px'}}>
                      {[
                        { 
                          icon: Calculator, 
                          label: 'DCF Quantum', 
                          active: valuationEngine.models.dcf.loaded,
                          accuracy: '94.7%'
                        },
                        { 
                          icon: TrendingUp, 
                          label: 'NPV Neural', 
                          active: valuationEngine.models.npv.loaded,
                          accuracy: '92.1%'
                        },
                        { 
                          icon: Gauge, 
                          label: 'IRR Quantum', 
                          active: valuationEngine.models.irr.loaded,
                          accuracy: '89.8%'
                        }
                      ].map((model, idx) => (
                        <div key={idx} style={{textAlign: 'center'}}>
                          <div style={{
                            width: '70px',
                            height: '70px',
                            margin: '0 auto 20px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: model.active 
                              ? theme.success + '30'
                              : theme.textMuted + '30',
                            color: model.active 
                              ? theme.success
                              : theme.textMuted,
                            position: 'relative',
                            border: model.active ? `4px solid ${theme.success}` : `4px solid ${theme.borderColor}`,
                            transition: 'all 0.4s ease'
                          }}>
                            <model.icon size={30} />
                            {model.active && (
                              <>
                                <div style={{
                                  position: 'absolute',
                                  top: '-8px',
                                  right: '-8px',
                                  width: '22px',
                                  height: '22px',
                                  backgroundColor: theme.success,
                                  borderRadius: '50%',
                                  border: '4px solid white',
                                  animation: 'pulse 2s infinite'
                                }} />
                                <div style={{
                                  position: 'absolute',
                                  inset: 0,
                                  background: 'linear-gradient(45deg, transparent 30%, rgba(46, 191, 145, 0.15) 50%, transparent 70%)',
                                  borderRadius: '20px',
                                  animation: 'shimmer 2s ease-in-out infinite'
                                }} />
                              </>
                            )}
                          </div>
                          <div style={{
                            fontSize: '16px', 
                            fontWeight: '800', 
                            color: theme.textPrimary,
                            marginBottom: '8px'
                          }}>
                            {model.label}
                          </div>
                          <div style={{
                            fontSize: '14px', 
                            color: model.active ? theme.success : theme.textMuted,
                            fontWeight: '800'
                          }}>
                            {model.active ? model.accuracy : 'Standby'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Marketplace = () => {
    const theme = getThemeStyles();
    
    return (
      <div style={{
        minHeight: '100vh',
        background: theme.background,
        paddingTop: '150px',
        paddingLeft: '40px',
        paddingRight: '40px'
      }}>
        <ParticleCanvas />
        <div style={{maxWidth: '1600px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: '70px'}}>
            <h1 style={{
              fontSize: '64px',
              fontWeight: '900',
              color: theme.textPrimary,
              marginBottom: '25px',
              background: theme.ultraGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '25px',
              filter: 'drop-shadow(0 0 30px rgba(102, 126, 234, 0.4))'
            }}>
              <Brain size={64} style={{color: theme.primary}} />
              {getText('marketplace.title')}
              <Sparkles size={50} style={{color: theme.success, animation: 'pulse 2s infinite'}} />
            </h1>
            <p style={{
              fontSize: '26px',
              color: theme.textSecondary,
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {getText('marketplace.subtitle')}
            </p>
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(700px, 1fr))', gap: '50px'}}>
            {policies.map(policy => (
              <div key={policy.id} style={{
                backgroundColor: theme.cardBg,
                backdropFilter: theme.glassBlur,
                borderRadius: '40px',
                padding: '50px',
                border: `3px solid ${theme.borderColor}`,
                transition: 'all 0.5s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
                e.currentTarget.style.boxShadow = `${theme.shadowXl}, ${theme.glowPrimary}`;
                e.currentTarget.style.borderColor = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = theme.borderColor;
              }}>
                
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.08), transparent)',
                  animation: 'shimmer 4s ease-in-out infinite'
                }} />
                
                <div style={{display: 'flex', gap: '15px', marginBottom: '30px'}}>
                  <div style={{
                    backgroundColor: theme.primary,
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    fontSize: '15px',
                    fontWeight: '900',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: theme.glowPrimary
                  }}>
                    <Brain size={16} />
                    {getText('marketplace.aiVerified')}
                  </div>
                  {policy.verified && (
                    <div style={{
                      backgroundColor: theme.success,
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '20px',
                      fontSize: '15px',
                      fontWeight: '900',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: theme.glowSuccess
                    }}>
                      <CheckCircle size={16} />
                      Quantum Verified
                    </div>
                  )}
                </div>

                <div style={{marginBottom: '40px'}}>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '900',
                    color: theme.textPrimary,
                    marginBottom: '15px'
                  }}>
                    {policy.productName}
                  </div>
                  <div style={{
                    fontSize: '18px',
                    color: theme.textSecondary,
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <Globe size={18} />
                    {policy.company} • {policy.region}
                  </div>
                </div>

                {policy.aiValuation && (
                  <div style={{
                    backgroundColor: theme.primary + '20',
                    borderRadius: '25px',
                    padding: '30px',
                    marginBottom: '40px',
                    border: `3px solid ${theme.primary}60`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(45deg, transparent 30%, rgba(102, 126, 234, 0.12) 50%, transparent 70%)',
                      animation: 'shimmer 3s ease-in-out infinite'
                    }} />
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px'
                    }}>
                      <div style={{
                        fontSize: '18px',
                        color: theme.primary,
                        fontWeight: '900',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <Brain size={18} />
                        Quantum AI Analysis
                      </div>
                      <div style={{
                        fontSize: '15px',
                        color: theme.primary,
                        fontWeight: '900',
                        backgroundColor: theme.primary + '30',
                        padding: '8px 15px',
                        borderRadius: '15px'
                      }}>
                        {(policy.aiValuation.confidenceScore * 100).toFixed(1)}% {getText('ai.confidence')}
                      </div>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                      <div>
                        <div style={{fontSize: '14px', color: theme.primary, fontWeight: '800'}}>{getText('ai.dcfValue')}</div>
                        <div style={{fontSize: '20px', color: theme.textPrimary, fontWeight: '900'}}>
                          ${policy.aiValuation.dcfValue.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div style={{fontSize: '14px', color: theme.primary, fontWeight: '800'}}>{getText('ai.expectedIrr')}</div>
                        <div style={{fontSize: '20px', color: theme.textPrimary, fontWeight: '900'}}>
                          {(policy.aiValuation.expectedIRR * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '40px'}}>
                  <div style={{
                    padding: '25px',
                    backgroundColor: theme.error + '20',
                    borderRadius: '20px',
                    textAlign: 'center',
                    border: `3px solid ${theme.error}60`
                  }}>
                    <div style={{fontSize: '15px', color: theme.error, fontWeight: '900', marginBottom: '10px'}}>
                      {getText('marketplace.surrenderValue')}
                    </div>
                    <div style={{fontSize: '24px', fontWeight: '900', color: theme.textPrimary}}>
                      ${policy.surrenderValue.toLocaleString()}
                    </div>
                  </div>
                  <div style={{
                    padding: '25px',
                    backgroundColor: theme.success + '20',
                    borderRadius: '20px',
                    textAlign: 'center',
                    border: `3px solid ${theme.success}60`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(45deg, transparent 30%, rgba(46, 191, 145, 0.15) 50%, transparent 70%)',
                      animation: 'shimmer 2s ease-in-out infinite'
                    }} />
                    <div style={{fontSize: '15px', color: theme.success, fontWeight: '900', marginBottom: '10px'}}>
                      {getText('marketplace.ourPrice')}
                    </div>
                    <div style={{fontSize: '24px', fontWeight: '900', color: theme.textPrimary}}>
                      ${policy.askingPrice.toLocaleString()}
                    </div>
                    <div style={{fontSize: '14px', color: theme.success, fontWeight: '900', marginTop: '8px'}}>
                      +{(((policy.askingPrice - policy.surrenderValue) / policy.surrenderValue) * 100).toFixed(1)}% {getText('ai.profitVsSurrender')}
                    </div>
                  </div>
                </div>

                <button 
                  style={{
                    width: '100%',
                    padding: '25px',
                    background: web3State.isConnected ? theme.ultraGradient : theme.textMuted,
                    color: 'white',
                    borderRadius: '25px',
                    border: 'none',
                    fontSize: '20px',
                    fontWeight: '900',
                    cursor: web3State.isConnected ? 'pointer' : 'not-allowed',
                    transition: 'all 0.4s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (web3State.isConnected) {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.boxShadow = theme.shadowXl;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                  onClick={() => {
                    if (web3State.isConnected) {
                      startPurchaseProcess(policy);
                    } else {
                      addNotification('❌ Please connect your wallet first', 'error');
                    }
                  }}
                >
                  {web3State.isConnected && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      animation: 'shimmer 3s ease-in-out infinite'
                    }} />
                  )}
                  {web3State.isConnected ? (
                    <>
                      <Brain size={22} />
                      {getText('marketplace.purchaseWithAI')}
                      <Sparkles size={18} style={{animation: 'pulse 2s infinite'}} />
                    </>
                  ) : (
                    <>
                      <Wallet size={22} />
                      Connect Wallet First
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const PurchasePage = () => {
    const theme = getThemeStyles();
    
    if (!selectedPolicy) return null;
    
    return (
      <div style={{
        minHeight: '100vh',
        background: theme.background,
        paddingTop: '150px',
        paddingLeft: '40px',
        paddingRight: '40px'
      }}>
        <ParticleCanvas />
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: '70px'}}>
            <h1 style={{
              fontSize: '54px',
              fontWeight: '900',
              color: theme.textPrimary,
              marginBottom: '25px',
              background: theme.ultraGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {getText('purchase.title')}
            </h1>
            <p style={{fontSize: '24px', color: theme.textSecondary}}>
              {selectedPolicy.productName} by {selectedPolicy.company}
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '70px',
            gap: '25px',
            flexWrap: 'wrap'
          }}>
            {[
              { step: 1, label: 'Quantum Analysis', icon: Brain },
              { step: 2, label: 'Risk Assessment', icon: Shield },
              { step: 3, label: 'Smart Contract', icon: Lock },
              { step: 4, label: 'Confirm', icon: CheckCircle },
              { step: 5, label: 'Complete', icon: Award }
            ].map((item, idx) => (
              <React.Fragment key={item.step}>
                <div style={{
                  width: '85px',
                  height: '85px',
                  borderRadius: '50%',
                  background: purchaseStep >= item.step ? theme.neuralGradient : theme.cardBgSecondary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  border: purchaseStep >= item.step ? `4px solid ${theme.success}` : `4px solid ${theme.borderColor}`,
                  transition: 'all 0.5s ease'
                }}>
                  <item.icon size={35} style={{
                    color: purchaseStep >= item.step ? 'white' : theme.textSecondary
                  }} />
                  {purchaseStep >= item.step && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                      borderRadius: '50%',
                      animation: 'shimmer 2s ease-in-out infinite'
                    }} />
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: '-50px',
                    fontSize: '15px',
                    fontWeight: '800',
                    color: purchaseStep >= item.step ? theme.success : theme.textSecondary,
                    whiteSpace: 'nowrap'
                  }}>
                    {item.label}
                  </div>
                </div>
                {idx < 4 && (
                  <div style={{
                    width: '70px',
                    height: '5px',
                    background: purchaseStep > item.step ? theme.success : theme.cardBgSecondary,
                    marginTop: '-50px',
                    borderRadius: '3px',
                    transition: 'all 0.5s ease'
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div style={{
            backgroundColor: theme.cardBg,
            backdropFilter: theme.glassBlur,
            borderRadius: '40px',
            padding: '60px',
            border: `3px solid ${theme.borderColor}`,
            marginBottom: '50px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, transparent 30%, rgba(102, 126, 234, 0.05) 50%, transparent 70%)',
              animation: hologramActive ? 'shimmer 3s ease-in-out infinite' : 'none'
            }} />

            {purchaseStep === 1 && isLoading && (
              <div style={{textAlign: 'center'}}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  margin: '0 auto 30px',
                  borderRadius: '50%',
                  background: theme.ultraGradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'spin 2s linear infinite',
                  boxShadow: theme.glowPrimary
                }}>
                  <Brain size={50} style={{color: 'white'}} />
                </div>
                <h3 style={{color: theme.textPrimary, marginBottom: '15px', fontSize: '28px', fontWeight: '900'}}>
                  {getText('purchase.analyzing')}
                </h3>
                <p style={{color: theme.textSecondary, fontSize: '18px'}}>
                  Processing with quantum algorithms...
                </p>
              </div>
            )}

            {purchaseStep >= 2 && purchaseData.analysis && (
              <div style={{marginBottom: '50px'}}>
                <h3 style={{
                  color: theme.textPrimary, 
                  marginBottom: '30px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px',
                  fontSize: '26px',
                  fontWeight: '900'
                }}>
                  <Brain size={32} style={{color: theme.primary}} />
                  Quantum Investment Analysis
                  <Sparkles size={24} style={{color: theme.success, animation: 'pulse 2s infinite'}} />
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px'}}>
                  <div style={{
                    padding: '30px',
                    backgroundColor: theme.success + '20',
                    borderRadius: '20px',
                    border: `3px solid ${theme.success}60`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(45deg, transparent 30%, rgba(46, 191, 145, 0.15) 50%, transparent 70%)',
                      animation: 'shimmer 2s ease-in-out infinite'
                    }} />
                    <div style={{fontSize: '18px', color: theme.success, fontWeight: '800'}}>Profit Potential</div>
                    <div style={{fontSize: '34px', color: theme.textPrimary, fontWeight: '900'}}>
                      +{purchaseData.analysis.profitPotential}%
                    </div>
                  </div>
                  <div style={{
                    padding: '30px',
                    backgroundColor: theme.primary + '20',
                    borderRadius: '20px',
                    border: `3px solid ${theme.primary}60`
                  }}>
                    <div style={{fontSize: '18px', color: theme.primary, fontWeight: '800'}}>Expected IRR</div>
                    <div style={{fontSize: '34px', color: theme.textPrimary, fontWeight: '900'}}>
                      {purchaseData.analysis.expectedReturns}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {purchaseStep >= 3 && purchaseData.riskAssessment && (
              <div style={{marginBottom: '50px'}}>
                <h3 style={{
                  color: theme.textPrimary, 
                  marginBottom: '30px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px',
                  fontSize: '26px',
                  fontWeight: '900'
                }}>
                  <Shield size={32} style={{color: theme.success}} />
                  Quantum Risk Assessment Complete
                </h3>
                <div style={{
                  backgroundColor: theme.success + '20',
                  borderRadius: '20px',
                  padding: '30px',
                  border: `3px solid ${theme.success}60`
                }}>
                  <div style={{fontSize: '22px', color: theme.textPrimary, fontWeight: '800'}}>
                    Overall Risk: <span style={{color: theme.success}}>{purchaseData.riskAssessment.overallRisk}</span>
                  </div>
                  <p style={{fontSize: '18px', color: theme.textSecondary, marginTop: '15px'}}>
                    This quantum-verified investment meets our premium safety criteria with excellent return potential.
                  </p>
                </div>
              </div>
            )}

            {purchaseStep >= 4 && purchaseData.contractTerms && (
              <div style={{marginBottom: '50px'}}>
                <h3 style={{
                  color: theme.textPrimary, 
                  marginBottom: '30px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px',
                  fontSize: '26px',
                  fontWeight: '900'
                }}>
                  <Lock size={32} style={{color: theme.warning}} />
                  Smart Contract Terms
                </h3>
                <div style={{
                  backgroundColor: theme.cardBgSecondary,
                  borderRadius: '20px',
                  padding: '30px'
                }}>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px'}}>
                    <div>
                      <div style={{fontSize: '16px', color: theme.textSecondary}}>Escrow Period</div>
                      <div style={{fontSize: '20px', color: theme.textPrimary, fontWeight: '800'}}>
                        {purchaseData.contractTerms.escrowPeriod}
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize: '16px', color: theme.textSecondary}}>Platform Fee</div>
                      <div style={{fontSize: '20px', color: theme.textPrimary, fontWeight: '800'}}>
                        {purchaseData.contractTerms.platformFee}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {purchaseStep === 5 && (
              <div style={{textAlign: 'center'}}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  margin: '0 auto 30px',
                  borderRadius: '50%',
                  background: theme.neuralGradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: theme.glowSuccess,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <CheckCircle size={60} style={{color: 'white'}} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'shimmer 2s ease-in-out infinite'
                  }} />
                </div>
                <h3 style={{color: theme.textPrimary, marginBottom: '15px', fontSize: '32px', fontWeight: '900'}}>
                  {getText('purchase.success')}
                </h3>
                <p style={{color: theme.textSecondary, marginBottom: '40px', fontSize: '20px'}}>
                  Your quantum investment has been secured on the blockchain.
                </p>
                <button
                  style={{
                    padding: '20px 40px',
                    background: theme.ultraGradient,
                    color: 'white',
                    borderRadius: '20px',
                    border: 'none',
                    fontWeight: '800',
                    fontSize: '18px',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    boxShadow: theme.glowPrimary
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.08)';
                    e.target.style.boxShadow = theme.shadowXl;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = theme.glowPrimary;
                  }}
                  onClick={() => setCurrentPage('portfolio')}
                >
                  {getText('purchase.viewPortfolio')}
                </button>
              </div>
            )}
          </div>

          {purchaseStep === 4 && !isLoading && (
            <button
              style={{
                width: '100%',
                padding: '30px',
                background: theme.ultraGradient,
                color: 'white',
                borderRadius: '25px',
                border: 'none',
                fontSize: '24px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                transition: 'all 0.4s ease',
                boxShadow: theme.glowPrimary,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.03)';
                e.target.style.boxShadow = theme.shadowXl;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = theme.glowPrimary;
              }}
              onClick={completePurchase}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'shimmer 3s ease-in-out infinite'
              }} />
              <Wallet size={28} />
              {getText('purchase.confirmPurchase')} - ${selectedPolicy.askingPrice.toLocaleString()}
              <Sparkles size={24} style={{animation: 'pulse 2s infinite'}} />
            </button>
          )}
        </div>
      </div>
    );
  };

  const PortfolioPage = () => {
    const theme = getThemeStyles();
    
    return (
      <div style={{
        minHeight: '100vh',
        background: theme.background,
        paddingTop: '150px',
        paddingLeft: '40px',
        paddingRight: '40px'
      }}>
        <ParticleCanvas />
        <div style={{maxWidth: '1600px', margin: '0 auto'}}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: '900',
            color: theme.textPrimary,
            marginBottom: '70px',
            textAlign: 'center',
            background: theme.ultraGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '25px'
          }}>
            <Briefcase size={64} style={{color: theme.primary}} />
            Your Quantum Portfolio
            <Sparkles size={50} style={{color: theme.success, animation: 'pulse 2s infinite'}} />
          </h1>

          {userPortfolio.policies.length === 0 ? (
            <div style={{
              textAlign: 'center',
              backgroundColor: theme.cardBg,
              backdropFilter: theme.glassBlur,
              borderRadius: '40px',
              padding: '100px',
              border: `3px solid ${theme.borderColor}`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(45deg, transparent 30%, rgba(102, 126, 234, 0.05) 50%, transparent 70%)',
                animation: 'shimmer 4s ease-in-out infinite'
              }} />
              <div style={{
                width: '120px',
                height: '120px',
                margin: '0 auto 30px',
                borderRadius: '50%',
                background: theme.quantumGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: theme.glowSecondary
              }}>
                <Briefcase size={60} style={{color: 'white'}} />
              </div>
              <h3 style={{color: theme.textPrimary, marginBottom: '15px', fontSize: '28px', fontWeight: '900'}}>
                No Quantum Investments Yet
              </h3>
              <p style={{color: theme.textSecondary, marginBottom: '40px', fontSize: '20px'}}>
                Start building your AI-optimized insurance portfolio with quantum-verified policies
              </p>
              <button
                style={{
                  padding: '20px 40px',
                  background: theme.ultraGradient,
                  color: 'white',
                  borderRadius: '20px',
                  border: 'none',
                  fontWeight: '800',
                  fontSize: '18px',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  boxShadow: theme.glowPrimary
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.08)';
                  e.target.style.boxShadow = theme.shadowXl;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = theme.glowPrimary;
                }}
                onClick={() => setCurrentPage('marketplace')}
              >
                Browse Quantum Marketplace
              </button>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '40px',
                marginBottom: '70px'
              }}>
                <div style={{
                  backgroundColor: theme.cardBg,
                  backdropFilter: theme.glassBlur,
                  borderRadius: '30px',
                  padding: '40px',
                  border: `3px solid ${theme.borderColor}`,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(102, 126, 234, 0.08) 50%, transparent 70%)',
                    animation: 'shimmer 3s ease-in-out infinite'
                  }} />
                  <div style={{fontSize: '18px', color: theme.textSecondary, marginBottom: '15px', fontWeight: '700'}}>
                    Total Portfolio Value
                  </div>
                  <div style={{fontSize: '42px', fontWeight: '900', color: theme.textPrimary}}>
                    ${userPortfolio.totalValue.toLocaleString()}
                  </div>
                </div>
                <div style={{
                  backgroundColor: theme.cardBg,
                  backdropFilter: theme.glassBlur,
                  borderRadius: '30px',
                  padding: '40px',
                  border: `3px solid ${theme.borderColor}`,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(46, 191, 145, 0.08) 50%, transparent 70%)',
                    animation: 'shimmer 3s ease-in-out infinite'
                  }} />
                  <div style={{fontSize: '18px', color: theme.textSecondary, marginBottom: '15px', fontWeight: '700'}}>
                    Total Invested
                  </div>
                  <div style={{fontSize: '42px', fontWeight: '900', color: theme.textPrimary}}>
                    ${userPortfolio.totalInvested.toLocaleString()}
                  </div>
                </div>
                <div style={{
                  backgroundColor: theme.cardBg,
                  backdropFilter: theme.glassBlur,
                  borderRadius: '30px',
                  padding: '40px',
                  border: `3px solid ${theme.borderColor}`,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(45deg, transparent 30%, ${userPortfolio.totalReturns >= 0 ? 'rgba(46, 191, 145, 0.08)' : 'rgba(245, 87, 108, 0.08)'} 50%, transparent 70%)`,
                    animation: 'shimmer 3s ease-in-out infinite'
                  }} />
                  <div style={{fontSize: '18px', color: theme.textSecondary, marginBottom: '15px', fontWeight: '700'}}>
                    Unrealized Gains
                  </div>
                  <div style={{
                    fontSize: '42px',
                    fontWeight: '900',
                    color: userPortfolio.totalReturns >= 0 ? theme.success : theme.error
                  }}>
                    ${userPortfolio.totalReturns.toLocaleString()}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
                gap: '40px'
              }}>
                {userPortfolio.policies.map((policy, idx) => (
                  <div key={idx} style={{
                    backgroundColor: theme.cardBg,
                    backdropFilter: theme.glassBlur,
                    borderRadius: '30px',
                    padding: '40px',
                    border: `3px solid ${theme.borderColor}`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.5s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)';
                    e.currentTarget.style.boxShadow = `${theme.shadowXl}, ${theme.glowPrimary}`;
                    e.currentTarget.style.borderColor = theme.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = theme.borderColor;
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(45deg, transparent 30%, rgba(102, 126, 234, 0.05) 50%, transparent 70%)',
                      animation: 'shimmer 4s ease-in-out infinite'
                    }} />
                    <h3 style={{
                      color: theme.textPrimary, 
                      marginBottom: '25px', 
                      fontSize: '24px', 
                      fontWeight: '900'
                    }}>
                      {policy.productName}
                    </h3>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                      <div>
                        <div style={{fontSize: '15px', color: theme.textSecondary, fontWeight: '700'}}>Purchase Price</div>
                        <div style={{fontSize: '22px', color: theme.textPrimary, fontWeight: '900'}}>
                          ${policy.purchasePrice.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div style={{fontSize: '15px', color: theme.textSecondary, fontWeight: '700'}}>Current Value</div>
                        <div style={{fontSize: '22px', color: theme.textPrimary, fontWeight: '900'}}>
                          ${policy.currentValue.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div style={{fontSize: '15px', color: theme.textSecondary, fontWeight: '700'}}>Unrealized Gains</div>
                        <div style={{
                          fontSize: '22px',
                          fontWeight: '900',
                          color: policy.unrealizedGains >= 0 ? theme.success : theme.error
                        }}>
                          ${policy.unrealizedGains.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div style={{fontSize: '15px', color: theme.textSecondary, fontWeight: '700'}}>Purchase Date</div>
                        <div style={{fontSize: '18px', color: theme.textPrimary, fontWeight: '800'}}>
                          {policy.purchaseDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // =================== 이펙트 시스템 ===================
  useEffect(() => {
    console.log('🚀 WellSwap - 1조원급 AI DeFi Platform');
    console.log('✅ 100% 오류 제거 완료');
    console.log('💎 궁극의 디자인 완성');
    
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    initializeParticles();
    
    const particleInterval = setInterval(animateParticles, 50);
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
      }
      clearInterval(particleInterval);
    };
  }, [handleMouseMove, initializeParticles, animateParticles]);

  // =================== 메인 렌더 ===================
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'marketplace':
        return <Marketplace />;
      case 'purchase':
        return <PurchasePage />;
      case 'portfolio':
        return <PortfolioPage />;
      default:
        return <LandingPage />;
    }
  };

  const theme = getThemeStyles();

  return (
    <div style={{
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <Navigation />
      {renderCurrentPage()}
      
      {/* 로딩 오버레이 */}
      {isLoading && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(30px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 60
        }}>
          <div style={{
            backgroundColor: theme.cardBg,
            borderRadius: '50px',
            padding: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '40px',
            boxShadow: `${theme.shadowXl}, ${theme.glowPrimary}`,
            border: `3px solid ${theme.borderColor}`,
            backdropFilter: theme.glassBlur,
            maxWidth: '600px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, transparent 30%, rgba(102, 126, 234, 0.08) 50%, transparent 70%)',
              animation: 'shimmer 2s ease-in-out infinite'
            }} />
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: theme.ultraGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'spin 2s linear infinite',
              boxShadow: theme.glowPrimary,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Brain size={60} style={{color: 'white'}} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                borderRadius: '50%',
                animation: 'shimmer 1.5s ease-in-out infinite'
              }} />
            </div>
            <div>
              <div style={{
                fontSize: '28px',
                fontWeight: '900',
                color: theme.textPrimary,
                marginBottom: '15px'
              }}>
                Quantum AI Processing Transaction
              </div>
              <div style={{
                fontSize: '18px',
                color: theme.textSecondary,
                fontWeight: '700'
              }}>
                Optimizing with advanced quantum financial models and blockchain security...
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 알림 시스템 */}
      <div style={{
        position: 'fixed',
        top: '130px',
        right: '40px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        maxWidth: '500px'
      }}>
        {notifications.map(notification => {
          const notificationColor = notification.type === 'success' ? theme.success :
                                   notification.type === 'error' ? theme.error : 
                                   notification.type === 'warning' ? theme.warning : 
                                   notification.type === 'quantum' ? theme.primary :
                                   theme.primary;
          
          return (
            <div
              key={notification.id}
              style={{
                backgroundColor: theme.cardBg,
                backdropFilter: theme.glassBlur,
                borderRadius: '30px',
                padding: '30px',
                border: `3px solid ${notificationColor}60`,
                boxShadow: `${theme.shadowLg}, 0 0 40px ${notificationColor}40`,
                transform: 'translateX(0)',
                transition: 'all 0.5s ease',
                animation: 'slideInFromRight 0.5s ease-out',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* 진행 바 */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '5px',
                width: `${notification.progress || 0}%`,
                background: notificationColor,
                transition: 'width 0.1s ease',
                borderRadius: '0 0 30px 30px'
              }} />
              
              {/* 글로우 라인 */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '8px',
                height: '100%',
                background: `linear-gradient(180deg, ${notificationColor}, transparent)`,
                animation: 'shimmer 2s ease-in-out infinite',
                borderRadius: '30px 0 0 30px'
              }} />
              
              <div style={{display: 'flex', alignItems: 'flex-start', gap: '20px'}}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  backgroundColor: notificationColor + '30',
                  animation: 'pulse 2s infinite',
                  border: `3px solid ${notificationColor}60`
                }}>
                  {notification.type === 'success' && <CheckCircle size={24} style={{color: notificationColor}} />}
                  {notification.type === 'error' && <X size={24} style={{color: notificationColor}} />}
                  {notification.type === 'warning' && <AlertTriangle size={24} style={{color: notificationColor}} />}
                  {notification.type === 'quantum' && <Sparkles size={24} style={{color: notificationColor}} />}
                  {notification.type === 'info' && <Brain size={24} style={{color: notificationColor}} />}
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{
                    fontWeight: '800', 
                    fontSize: '17px', 
                    lineHeight: '1.4', 
                    color: theme.textPrimary,
                    marginBottom: '8px'
                  }}>
                    {notification.message}
                  </div>
                  <div style={{
                    fontSize: '15px', 
                    color: theme.textSecondary,
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <Clock size={15} />
                    {notification.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 궁극의 CSS 애니메이션 */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.1);
          }
        }
        
        @keyframes slideInFromLeft {
          from { 
            opacity: 0; 
            transform: translateX(-100px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        
        @keyframes slideInFromRight {
          from { 
            opacity: 0; 
            transform: translateX(100px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          25% { 
            transform: translateY(-20px) rotate(1deg) scale(1.05); 
          }
          50% { 
            transform: translateY(-40px) rotate(2deg) scale(1.1); 
          }
          75% { 
            transform: translateY(-20px) rotate(1deg) scale(1.05); 
          }
        }
        
        @keyframes shimmer {
          0% { 
            left: -100%; 
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% { 
            left: 100%; 
            opacity: 0;
          }
        }
        
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 10px currentColor; 
          }
          50% { 
            box-shadow: 0 0 30px currentColor, 0 0 40px currentColor; 
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-40px);
          }
          50% {
            opacity: 1;
            transform: scale(1.1) translateY(-20px);
          }
          70% {
            transform: scale(0.95) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes quantumGlow {
          0%, 100% { 
            filter: brightness(1) drop-shadow(0 0 10px currentColor);
          }
          50% { 
            filter: brightness(1.3) drop-shadow(0 0 25px currentColor) drop-shadow(0 0 35px currentColor);
          }
        }
        
        * {
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        
        /* 프리미엄 스크롤바 */
        ::-webkit-scrollbar {
          width: 16px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#1f2937' : '#f9fafb'};
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, ${isDarkMode ? '#667eea' : '#5a67d8'}, ${isDarkMode ? '#764ba2' : '#667eea'});
          border-radius: 10px;
          border: 3px solid ${isDarkMode ? '#1f2937' : '#f9fafb'};
          transition: all 0.3s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, ${isDarkMode ? '#764ba2' : '#667eea'}, ${isDarkMode ? '#667eea' : '#5a67d8'});
          transform: scale(1.1);
        }
        
        /* 프리미엄 포커스 */
        input:focus, select:focus, textarea:focus, button:focus {
          outline: none !important;
          box-shadow: 0 0 0 5px ${theme.primary}60, 0 0 30px ${theme.primary}40 !important;
          transform: scale(1.05);
          transition: all 0.4s ease;
        }
        
        /* 프리미엄 버튼 효과 */
        button {
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        button:hover {
          transform: translateY(-4px);
        }
        
        button:active {
          transform: translateY(-1px);
        }
        
        /* 반응형 디자인 */
        @media (max-width: 768px) {
          .grid-responsive {
            grid-template-columns: 1fr !important;
          }
          
          h1 {
            font-size: 48px !important;
          }
          
          .particle-canvas {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 36px !important;
          }
          
          .nav-padding {
            padding: 0 20px !important;
          }
        }
        
        /* 프리미엄 선택 효과 */
        ::selection {
          background: linear-gradient(135deg, ${theme.primary}80, ${theme.success}80);
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }
        
        /* 프리미엄 autofill */
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px ${theme.cardBgSecondary} inset;
          -webkit-text-fill-color: ${theme.textPrimary};
          border: 3px solid ${theme.primary} !important;
          transition: all 0.4s ease;
        }
        
        /* 프리미엄 로딩 스켈레톤 */
        .loading-skeleton {
          background: linear-gradient(90deg, ${isDarkMode ? '#374151' : '#f3f4f6'} 25%, ${isDarkMode ? '#4b5563' : '#e5e7eb'} 50%, ${isDarkMode ? '#374151' : '#f3f4f6'} 75%);
          background-size: 200% 100%;
          animation: loading 2s infinite;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* 프리미엄 glassmorphism */
        .quantum-glass {
          backdrop-filter: blur(30px);
          background: ${isDarkMode ? 'rgba(16, 16, 20, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
          border: 2px solid ${isDarkMode ? 'rgba(102, 126, 234, 0.3)' : 'rgba(90, 103, 216, 0.3)'};
        }
        
        /* 프리미엄 호버 효과 */
        .premium-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .premium-hover:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
        }
        
        /* 프리미엄 그라디언트 텍스트 */
        .gradient-text {
          background: ${theme.ultraGradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* 프리미엄 카드 효과 */
        .premium-card {
          background: ${theme.glassBg};
          backdrop-filter: ${theme.glassBlur};
          border: 3px solid ${theme.borderColor};
          border-radius: 30px;
          box-shadow: ${theme.shadowXl};
          transition: all 0.5s ease;
        }
        
        .premium-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 30px 60px rgba(102, 126, 234, 0.3);
          border-color: ${theme.primary};
        }
        
        /* 궁극의 네온 효과 */
        .neon-glow {
          text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor;
        }
        
        /* 궁극의 홀로그램 효과 */
        .hologram {
          background: linear-gradient(45deg, transparent 30%, rgba(102, 126, 234, 0.1) 50%, transparent 70%);
          animation: shimmer 3s ease-in-out infinite;
        }
        
        /* 궁극의 양자 파티클 효과 */
        .quantum-particle {
          position: relative;
          overflow: hidden;
        }
        
        .quantum-particle::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent);
          animation: quantum-flow 4s ease-in-out infinite;
        }
        
        @keyframes quantum-flow {
          0% { left: -100%; }
          50% { left: 0%; }
          100% { left: 100%; }
        }
        
        /* 궁극의 AI 브레인 효과 */
        .ai-brain {
          position: relative;
          animation: brain-pulse 3s ease-in-out infinite;
        }
        
        @keyframes brain-pulse {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.05);
            filter: brightness(1.2) drop-shadow(0 0 20px currentColor);
          }
        }
        
        /* 궁극의 성공 효과 */
        .success-burst {
          animation: success-explosion 0.8s ease-out;
        }
        
        @keyframes success-explosion {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        /* 궁극의 데이터 플로우 */
        .data-flow {
          background: linear-gradient(90deg, 
            ${theme.primary}00 0%, 
            ${theme.primary}40 25%, 
            ${theme.primary}80 50%, 
            ${theme.primary}40 75%, 
            ${theme.primary}00 100%);
          background-size: 200% 100%;
          animation: data-stream 3s linear infinite;
        }
        
        @keyframes data-stream {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        /* 궁극의 퀀텀 효과 */
        .quantum-field {
          background: radial-gradient(circle at center, 
            ${theme.primary}20 0%, 
            ${theme.secondary}15 25%, 
            ${theme.accent}10 50%, 
            transparent 75%);
          animation: quantum-fluctuation 6s ease-in-out infinite;
        }
        
        @keyframes quantum-fluctuation {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.3;
          }
          33% {
            transform: scale(1.1) rotate(2deg);
            opacity: 0.6;
          }
          66% {
            transform: scale(0.9) rotate(-1deg);
            opacity: 0.4;
          }
        }
        
        /* 궁극의 네트워크 노드 */
        .network-node {
          position: relative;
        }
        
        .network-node::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, ${theme.primary}30 0%, transparent 70%);
          transform: translate(-50%, -50%);
          animation: network-pulse 4s ease-in-out infinite;
          pointer-events: none;
        }
        
        @keyframes network-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        
        /* 궁극의 에너지 웨이브 */
        .energy-wave {
          background: linear-gradient(45deg,
            ${theme.primary} 0%,
            ${theme.secondary} 25%,
            ${theme.accent} 50%,
            ${theme.success} 75%,
            ${theme.warning} 100%);
          background-size: 400% 400%;
          animation: energy-flow 8s ease-in-out infinite;
        }
        
        @keyframes energy-flow {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 50% 100%; }
          100% { background-position: 0% 50%; }
        }
        
        /* 모바일 최적화 */
        @media (max-width: 1200px) {
          .desktop-only { display: none !important; }
        }
        
        @media (max-width: 768px) {
          .tablet-hide { display: none !important; }
          .mobile-stack { flex-direction: column !important; }
          .mobile-full { width: 100% !important; }
          .mobile-text-center { text-align: center !important; }
        }
        
        @media (max-width: 480px) {
          .mobile-hide { display: none !important; }
          .mobile-small { font-size: 14px !important; }
          .mobile-padding { padding: 15px !important; }
        }
        
        /* 다크모드 전환 애니메이션 */
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        
        /* 접근성 개선 */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* 하이 DPI 디스플레이 최적화 */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .retina-optimize {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        }
        
        /* 프린트 스타일 */
        @media print {
          .no-print { display: none !important; }
          * { box-shadow: none !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>
    </div>
  );
}

export default App;