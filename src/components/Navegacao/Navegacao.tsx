import { useState, useEffect, useRef, type JSX } from "react";
import { useNavigate } from 'react-router-dom';
import appIcon from "../../assets/app-icon.png";

interface CustomMenuItem {
    label?: string;
    icon?: string;
    className?: string;
    url?: string;
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Fecha o menu ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setMobileMenuOpen(false);
            }
        }
        if (mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mobileMenuOpen]);

    // Fecha o menu ao redimensionar para desktop
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const items: CustomMenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
            url: "/"
        },
        {
            label: 'Clientes',
            icon: 'pi pi-star',
            className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
            url: "/lista/clientes"
        },
        {
            label: 'Produtos',
            icon: 'pi pi-star',
            className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
            url: "/lista/livros"
        },
        {
            label: 'Pedidos',
            icon: 'pi pi-star',
            className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
            url: "/lista/pedidos"
        },
        {
            label: 'ItemPedidos',
            icon: 'pi pi-star',
            className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
            url: "/lista/itempedidos"
        }
    ];

    const mobileNavItems = [
        { label: 'Home', icon: 'pi pi-home', url: '/' },
        { label: 'Cliente', icon: 'pi pi-users', url: '/lista/clientes' },
        { label: 'Produto', icon: 'pi pi-book', url: '/lista/produtos' },
        { label: 'Pedido', icon: 'pi pi-sync', url: '/lista/pedidos' },
        { label: 'ItemPedido', icon: 'pi pi-sync', url: '/lista/itempedidos' },
    ];

    const start = (
        <img
            alt="logo"
            src={appIcon}
            className="h-10 md:h-12 lg:h-14 w-auto ml-2 md:ml-4 lg:ml-6"
        />
    );

    return (
        <>
            <header className="card bg-slate-700 flex items-center px-2 md:px-4 py-3 min-h-[64px]">

                {/* === DESKTOP: Menubar original === */}
                <div className="hidden md:flex flex-1">
                    <nav className="flex flex-1 items-center">
                        {start}
                        <div className="flex items-center">
                            {items.map((item) => (
                                <button
                                    key={item.url}
                                    type="button"
                                    className={`${item.className ?? ''} bg-transparent border-none cursor-pointer`}
                                    onClick={() => item.url && navigate(item.url)}
                                >
                                    {item.icon && <i className={`${item.icon} mr-2`} />}
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </nav>
                </div>

                {/* === MOBILE: logo + avatar + hambúrguer === */}
                <div className="flex md:hidden flex-1 items-center justify-between px-2">
                    {/* Logo */}
                    <img alt="logo" src={appIcon} className="h-10 w-auto" />

                    {/* Avatar (só se autenticado) + Hambúrguer */}
                    <div className="flex items-center gap-3">
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 bg-white hover:bg-gray-100 transition-colors border-none cursor-pointer shadow-sm"
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                            aria-label="Abrir menu"
                        >
                            <i className={`pi ${mobileMenuOpen ? 'pi-times' : 'pi-bars'} text-lg`}></i>
                        </button>
                    </div>
                </div>

                {/* Ações do usuário — desktop */}
            </header>

            {/* === DRAWER MOBILE (abre pela direita) === */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-50 md:hidden"
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                >
                    <div
                        ref={mobileMenuRef}
                        className="absolute top-0 right-0 h-full w-64 bg-slate-800 shadow-2xl flex flex-col"
                        style={{ animation: 'slideInRight 0.22s cubic-bezier(0.4,0,0.2,1)' }}
                    >
                        {/* Cabeçalho do drawer */}
                        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-600">
                            <img alt="logo" src={appIcon} className="h-10 w-auto" />
                            <button
                                className="text-white hover:text-slate-300 transition-colors bg-transparent border-none cursor-pointer"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Fechar menu"
                            >
                                <i className="pi pi-times text-lg"></i>
                            </button>
                        </div>
                        {/* Links de navegação */}
                        <nav className="flex flex-col flex-1 px-2 py-3 gap-1">
                            {mobileNavItems.map((item) => (
                                <a
                                    key={item.url}
                                    href={item.url}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-slate-600 transition-colors text-base no-underline"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <i className={`${item.icon} text-slate-300`}></i>
                                    <span>{item.label}</span>
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to   { transform: translateX(0);    opacity: 1; }
                }
            `}</style>
        </>
    );
}

export default Navegacao;   