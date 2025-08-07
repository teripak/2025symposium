// Load header
function loadHeader() {
    const headerHTML = `
    <!-- Header -->
    <header class="header">
        <div class="container">
                                    <div class="logo">
                            <a href="index.html">
                                <h1>2025 가상융합혁신인재 심포지엄</h1>
                            </a>
                        </div>
            <nav class="nav">
                <ul class="nav-menu">
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link">행사소개 <i class="fas fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="intro-greeting.html">초대의 글</a></li>
                            <li><a href="intro-business.html">사업소개</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link">프로그램 <i class="fas fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="program-overview.html">전체 프로그램</a></li>
                            <li><a href="program-detail.html">세부 프로그램</a></li>
                            <li><a href="program-events.html">참여 이벤트</a></li>
                        </ul>
                    </li>
                                                    <li class="nav-item">
                                    <a href="exhibition.html" class="nav-link">전시</a>
                                </li>
                                                    <li class="nav-item">
                                    <a href="venue.html" class="nav-link">행사장 안내</a>
                                </li>
                    <li class="nav-item">
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdIi34ULKrrX7O9gXMuef7P3k8o3_hLkL9Iz1S_Jzgd8ORReg/viewform" 
                           target="_blank" class="nav-link register-btn">
                            <i class="fas fa-user-plus"></i> 사전등록
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="mobile-menu-toggle">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>
    `;
    
    $('#header-container').html(headerHTML);
    initializeHeader();
}

// Load footer
function loadFooter() {
    const footerHTML = `
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <h3>2025 가상융합혁신인재 심포지엄</h3>
                </div>
                <div class="footer-info">
                    <p><i class="fas fa-envelope"></i> metaone01@sogang.ac.kr</p>
                    <p><i class="fas fa-map-marker-alt"></i> 서울특별시 마포구 백범로 35(신수동) 서강대학교 가브리엘관(GA)</p>
                </div>
            </div>
        </div>
    </footer>
    `;
    
    $('#footer-container').html(footerHTML);
}

// Initialize header functionality
function initializeHeader() {
    // Mobile menu toggle
    $('.mobile-menu-toggle').on('click', function() {
        $('.nav-menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-times');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.nav, .mobile-menu-toggle').length) {
            $('.nav-menu').removeClass('active');
            $('.mobile-menu-toggle i').removeClass('fa-times').addClass('fa-bars');
        }
    });

    // Dropdown menu hover effects (desktop only)
    $('.dropdown').on('mouseenter', function() {
        if ($(window).width() > 1024) {
            $(this).find('.dropdown-menu').addClass('show');
        }
    }).on('mouseleave', function() {
        if ($(window).width() > 1024) {
            $(this).find('.dropdown-menu').removeClass('show');
        }
    });

    // Dropdown menu click effects for mobile
    $(document).on('click', '.dropdown > .nav-link', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = $(this).parent();
        const dropdownMenu = dropdown.find('.dropdown-menu');
        
        // Close other dropdowns
        $('.dropdown-menu').not(dropdownMenu).removeClass('show');
        
        // Toggle current dropdown
        dropdownMenu.toggleClass('show');
        
        // Log for debugging
        console.log('Dropdown clicked:', dropdownMenu.hasClass('show'));
    });

    // Close dropdown when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown-menu').removeClass('show');
        }
    });
}

$(document).ready(function() {
    // Load header and footer
    loadHeader();
    loadFooter();

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80 // Account for fixed header
            }, 800);
        }
    });



    // Animate elements on scroll
    function animateOnScroll() {
        $('.section').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    }

    // Initial animation check
    animateOnScroll();

    // Check animations on scroll
    $(window).on('scroll', animateOnScroll);

    // Hero section parallax effect
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        const hero = $('.hero');
        const heroHeight = hero.outerHeight();
        
        if (scrolled < heroHeight) {
            const parallax = scrolled * 0.5;
            hero.css('transform', `translateY(${parallax}px)`);
        }
    });

    // Register button click effect
    $('.register-btn').on('click', function() {
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 200);
    });

    // Add loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });
    
    // Fallback: if load event doesn't fire, show content after a short delay
    setTimeout(function() {
        $('body').addClass('loaded');
    }, 100);

    // Form validation for any future forms
    $('form').on('submit', function(e) {
        const requiredFields = $(this).find('[required]');
        let isValid = true;

        requiredFields.each(function() {
            if (!$(this).val()) {
                isValid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('필수 항목을 모두 입력해주세요.');
        }
    });

    // Remove error class on input
    $('input, textarea').on('input', function() {
        $(this).removeClass('error');
    });

    // Back to top button
    const backToTop = $('<button class="back-to-top"><i class="fas fa-chevron-up"></i></button>');
    $('body').append(backToTop);

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            backToTop.addClass('show');
        } else {
            backToTop.removeClass('show');
        }
    });

    backToTop.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // Add some interactive effects
    $('.ai-logo').on('mouseenter', function() {
        $(this).addClass('pulse');
    }).on('mouseleave', function() {
        $(this).removeClass('pulse');
    });

    // Add typing effect to hero title (optional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.html('');
        
        function type() {
            if (i < text.length) {
                element.html(element.html() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Uncomment the line below if you want a typing effect
    // typeWriter($('.hero-title'), '2025 가상융합혁신인재 심포지엄');
});

// Additional CSS for animations (will be added to styles.css)
const additionalCSS = `
    .section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }

    .section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .register-btn.clicked {
        transform: scale(0.95);
    }

    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    }

    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }

    .back-to-top:hover {
        background: #1e40af;
        transform: translateY(-3px);
    }

    .ai-logo.pulse {
        animation: pulse 0.6s ease-in-out;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .dropdown-menu.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    body.loaded {
        opacity: 1;
    }

    body {
        opacity: 1;
        transition: opacity 0.5s ease;
    }

    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
`;

// Add the additional CSS to the page
$('<style>').html(additionalCSS).appendTo('head'); 