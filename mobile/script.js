// Always start at top on reload
window.onbeforeunload = function () { window.scrollTo(0, 0); };



// Mobile Menu Functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', function() {
  mobileMenuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
mobileMenu.addEventListener('click', function(e) {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    
    mobileMenuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    
    // Smooth scroll to target section
    if (targetId.startsWith('#')) {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        setTimeout(() => {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
      }
    }
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close mobile menu when scrolling
let scrollTimeout;
window.addEventListener('scroll', function() {
  if (mobileMenu.classList.contains('active')) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      mobileMenuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }, 100);
  }
}); 

// Process steps scroll animation
const processSteps = document.querySelectorAll('.process-step');
const processObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { 
  threshold: 0.4,
  rootMargin: '0px 0px -40px 0px'
});

processSteps.forEach(step => processObserver.observe(step)); 

// Timeline scroll effect
function updateTimelineGradient() {
  const timeline = document.querySelector('.timeline-gradient-line');
  const circles = document.querySelectorAll('.timeline-circle');
  const boxes = document.querySelectorAll('.process-box');
  if (!timeline || circles.length === 0) return;

  // Calculate scroll progress (0 = first circle, 1 = last circle)
  let progress = 0;
  let lastActive = 0;
  const windowHeight = window.innerHeight;
  circles.forEach((circle, idx) => {
    const circleRect = circle.getBoundingClientRect();
    if (circleRect.top < windowHeight * 0.5) {
      lastActive = idx + 1;
    }
  });
  progress = lastActive / circles.length;

  // Smooth gradient: interpolate stops
  const grad = `linear-gradient(180deg, #3462FC 0%, #3462FC ${(progress * 100).toFixed(1)}%, #092D53 ${(progress * 100).toFixed(1)}%, #092D53 100%)`;
  timeline.style.background = grad;

  // Remove top/height setting so the line always fills the column
  // Center timeline line between first and last circle (removed for full height)
  // const offsetTop = firstCircle.offsetTop + firstCircle.offsetHeight / 2;
  // const offsetBottom = lastCircle.offsetTop + lastCircle.offsetHeight / 2;
  // timeline.style.top = offsetTop + 'px';
  // timeline.style.height = (offsetBottom - offsetTop) + 'px';

  // Update circle and box colors
  circles.forEach((circle, idx) => {
    if (idx < lastActive) {
      circle.classList.add('active');
      if (boxes[idx]) boxes[idx].classList.add('active');
    } else {
      circle.classList.remove('active');
      if (boxes[idx]) boxes[idx].classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateTimelineGradient);
window.addEventListener('resize', updateTimelineGradient);
setTimeout(updateTimelineGradient, 300); 

// Enhanced Lazy Loading Scroll Observer
const lazyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Add staggered animation delays for child elements
      const children = entry.target.querySelectorAll('.stagger-1, .stagger-2, .stagger-3, .stagger-4, .stagger-5');
      children.forEach(child => {
        child.classList.add('visible');
      });
    }
  });
}, { 
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

// Apply enhanced lazy loading to sections
document.addEventListener('DOMContentLoaded', function() {
  // Add animation classes to elements with staggered delays
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    // Add fade-in to section titles
    const titles = section.querySelectorAll('h1, h2');
    titles.forEach((title, titleIndex) => {
      title.classList.add('fade-in', `stagger-${titleIndex + 1}`);
      lazyObserver.observe(title);
    });

    // Add slide-in-left to left-aligned content
    const leftContent = section.querySelectorAll('.process-box.left, .whatwedo-card:nth-child(odd)');
    leftContent.forEach((item, itemIndex) => {
      item.classList.add('slide-in-left', `stagger-${itemIndex + 1}`);
      lazyObserver.observe(item);
    });

    // Add slide-in-right to right-aligned content
    const rightContent = section.querySelectorAll('.process-box.right, .whatwedo-card:nth-child(even)');
    rightContent.forEach((item, itemIndex) => {
      item.classList.add('slide-in-right', `stagger-${itemIndex + 1}`);
      lazyObserver.observe(item);
    });

    // Add scale-in to cards and team members, EXCEPT testimonial cards
    const cards = section.querySelectorAll('.wmic-card, .wwa-member, .hero-card');
    cards.forEach((card, cardIndex) => {
      card.classList.add('scale-in', `stagger-${cardIndex + 1}`);
      lazyObserver.observe(card);
    });

    // Add bounce-in to special elements
    const specialElements = section.querySelectorAll('.hero-btn, .cs-btn');
    specialElements.forEach((element, elementIndex) => {
      element.classList.add('bounce-in', `stagger-${elementIndex + 1}`);
      lazyObserver.observe(element);
    });

    // Add fade-in to descriptions and paragraphs
    const descriptions = section.querySelectorAll('p, .hero-subtitle, .hero-support');
    descriptions.forEach((desc, descIndex) => {
      desc.classList.add('fade-in', `stagger-${descIndex + 1}`);
      lazyObserver.observe(desc);
    });
  });

  // Special handling for hero section with enhanced timing
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const heroElements = heroContent.children;
    Array.from(heroElements).forEach((element, index) => {
      element.classList.add('fade-in');
      element.style.animationDelay = `${0.3 + index * 0.2}s`;
      lazyObserver.observe(element);
    });
  }

  // --- TESTIMONIALS FADE-IN AS GROUP ---
  const testimonialsSection = document.querySelector('.testimonials-section');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialsSection && testimonialCards.length > 0) {
    const testimonialsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          testimonialCards.forEach(card => {
            card.classList.add('fade-in', 'visible');
            // Also fade in testimonial-content inside each card
            const content = card.querySelector('.testimonial-content');
            if (content) {
              content.classList.add('fade-in', 'visible');
            }
          });
          testimonialsObserver.disconnect();
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    testimonialsObserver.observe(testimonialsSection);
  }

  // --- MATCH TESTIMONIALS MARQUEE SPEED ON MOBILE TO DESKTOP ---
  const marqueeTrack = document.querySelector('.testimonials-marquee-track');
  if (marqueeTrack) {
    marqueeTrack.style.animationDuration = '40s';
  }

  // Simple fade for What We Do cards on mobile (show back for 5s, then auto-revert)
  if (window.innerWidth <= 768) {
    const whatWeDoCards = document.querySelectorAll('.whatwedo-card');
    whatWeDoCards.forEach(card => {
      let backTimeout;
      card.addEventListener('click', function(e) {
        if (card.classList.contains('placeholder')) return;
        card.classList.add('show-back');
        clearTimeout(backTimeout);
        backTimeout = setTimeout(() => {
          card.classList.remove('show-back');
        }, 5000);
      });
    });
  }
});

// Enhanced scroll effects
window.addEventListener('scroll', function() {
  // Parallax effect for hero gradient (disabled on mobile for performance)
  const heroGradient = document.querySelector('.hero-gradient-bg');
  if (heroGradient && window.innerWidth > 768) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    heroGradient.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.02}deg)`;
  }

  // Navbar scroll effect with enhanced styling
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(237, 239, 244, 0.95)';
    navbar.style.backdropFilter = 'blur(25px)';
    navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(237, 239, 244, 0.8)';
    navbar.style.backdropFilter = 'blur(20px)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  }
});

// Mobile-specific optimizations
if (window.innerWidth <= 768) {
  // Disable hover effects on mobile
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .whatwedo-card:hover .card-inner,
      .wmic-card:hover,
      .wwa-member:hover,
      .process-box:hover .step-box,
      .hero-card:hover,
      .navbar-links a:hover::before {
        transform: none !important;
        box-shadow: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// --- REMOVE FLIP LOGIC FOR MOBILE ---
if (window.innerWidth <= 768) {
  // Remove any inline transform or transition from previous logic
  document.querySelectorAll('.whatwedo-card').forEach(card => {
    card.style.transform = '';
    card.style.transition = '';
  });
}

// Enhanced team member hover effects
document.querySelectorAll('.wwa-member').forEach(member => {
  member.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.03)';
    this.style.boxShadow = '0 15px 35px rgba(46, 102, 252, 0.15)';
  });
  
  member.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
  });
});

// Smooth scroll for navigation links with enhanced behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      if (window.innerWidth > 768) {
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo(0, offsetTop);
      }
    }
  });
}); 

if (window.innerWidth > 768) {
  // Custom scroll speed for the whole page except process section (desktop only)
  (function() {
    let isInProcessSection = false;
    const processSection = document.querySelector('.process-section');
    function isSectionInView() {
      if (!processSection) return false;
      const rect = processSection.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }
    function onWheel(e) {
      if (isInProcessSection) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaY * 0.3, behavior: 'auto' });
      } else {
        e.preventDefault();
        window.scrollBy({ top: e.deltaY * 0.5, behavior: 'auto' }); // Faster than process section
      }
    }
    function onTouchMove(e) {
      if (isInProcessSection) {
        e.preventDefault();
      }
    }
    function checkSection() {
      isInProcessSection = isSectionInView();
    }
    window.addEventListener('scroll', checkSection, { passive: true });
    window.addEventListener('resize', checkSection);
    if (processSection) {
      processSection.addEventListener('mouseenter', checkSection);
      processSection.addEventListener('mouseleave', checkSection);
    }
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
  })();
} 

// ── STARTUP DIAGNOSTIC QUESTIONNAIRE ──

const DIAG_STEP_NAMES = ['Stage', 'Problem', 'Roadblock', 'Your Goal', 'Book Call'];

let diagQ = null;
let diagHistory = [-1];
let diagAnswers = { stage: null, problem: null, roadblock: null, customAnswer: '' };
let diagCustomInputs = {};

function initDiagnostic() {
    fetch('../questionnaire.json')
        .then(r => { if (!r.ok) throw new Error('Failed to load'); return r.json(); })
        .then(data => { diagQ = data; renderScreen(); })
        .catch(() => {
            document.getElementById('diagnostic-system').innerHTML =
                '<p style="text-align:center;color:rgba(9,45,83,0.5);padding:40px">Could not load questionnaire.</p>';
        });
}

function navigateTo(screen) {
    diagHistory.push(screen);
    renderScreen();
}

function goBack() {
    if (diagHistory.length > 1) diagHistory.pop();
    renderScreen();
}

function currentScreen() {
    return diagHistory[diagHistory.length - 1];
}

function renderScreen() {
    const container = document.getElementById('diagnostic-system');
    const step = currentScreen();
    container.style.opacity = '0';
    setTimeout(() => {
        if (step < 0) renderLanding();
        else if (step === 0) renderStages();
        else if (step === 1) renderProblems();
        else if (step === 2) renderRoadblocks();
        else if (step === 3) renderTextQ();
        else if (step === 4) renderSummary();
        container.style.opacity = '1';
    }, 150);
}

/* ── Progress Bar ── */
function progressBar(stepIdx) {
    const total = DIAG_STEP_NAMES.length;
    const pct = Math.round(((stepIdx + 1) / total) * 100);
    const fillPct = total > 1 ? ((stepIdx + 0.5) / total) * 100 : 50;
    let h = '<div class="diag-progress">';
    h += '<div class="diag-progress-track">';
    h += '<div class="diag-progress-fill" style="width:' + fillPct + '%"></div>';
    for (let i = 0; i < total; i++) {
        const c = i < stepIdx ? 'done' : i === stepIdx ? 'active' : '';
        h += '<div class="diag-progress-step ' + c + '">';
        if (i < stepIdx) {
            h += '<div class="diag-progress-circle"><i class="fa-solid fa-check"></i></div>';
        } else {
            h += '<div class="diag-progress-circle">' + (i + 1) + '</div>';
        }
        h += '<span class="diag-progress-label">' + DIAG_STEP_NAMES[i] + '</span>';
        h += '</div>';
    }
    h += '</div>';
    h += '<div class="diag-progress-meta">';
    h += '<span class="diag-progress-current">' + DIAG_STEP_NAMES[stepIdx] + '</span>';
    h += '<span class="diag-progress-pct">' + pct + '%</span>';
    h += '</div></div>';
    return h;
}

function navRow(showBack) {
    return '<div class="diag-nav">' +
        (showBack ? '<button class="diag-btn-back" data-diag-action="back"><i class="fa-solid fa-arrow-left"></i> Back</button>' : '<div></div>') +
        '</div>';
}

function renderOptions(opts, selectedId) {
    let h = '<div class="diag-options">';
    opts.forEach(o => {
        const sel = o.id === selectedId ? ' selected' : '';
        const isText = o.type === 'text_input';
        h += '<div class="diag-option' + sel + '" data-id="' + o.id + '">' +
            '<span class="diag-option-dot"></span>' +
            '<span class="diag-option-text">' + o.label + '</span>' +
            (isText ? '' : '<i class="fa-solid fa-chevron-right"></i>') +
            '</div>';
    });
    return h + '</div>';
}

function bindOptions(clickFn) {
    document.querySelectorAll('.diag-option').forEach(el => {
        el.addEventListener('click', () => clickFn(el.dataset.id));
    });
}

/* ── Delegated Navigation ── */
(function initNav() {
    const navRoot = document.getElementById('diagnostic-system');
    if (!navRoot) return;
    navRoot.addEventListener('click', function(e) {
        const btn = e.target.closest('[data-diag-action]');
        if (!btn) return;
        const action = btn.dataset.diagAction;
        if (action === 'back') { goBack(); return; }
        if (action === 'start') { navigateTo(0); return; }
        if (action === 'book') {
            const a = diagAnswers;
            const params = new URLSearchParams({
                stage: a.stage?.label || '',
                problem: (a.problem?.label || '') + (a.problem?.customText ? ': ' + a.problem.customText : ''),
                roadblock: (a.roadblock?.label || '') + (a.roadblock?.customText ? ': ' + a.roadblock.customText : ''),
                goal: a.customAnswer || ''
            });
            window.open('https://calendly.com/shardulsingh/30min?' + params.toString(), '_blank');
            return;
        }
        if (action === 'next-text') {
            const textarea = document.getElementById('diag-text-custom');
            const val = textarea.value.trim();
            if (!val) { textarea.style.borderColor = '#ff4444'; return; }
            diagAnswers.customAnswer = val;
            navigateTo(4);
            return;
        }
        if (action === 'custom-submit') {
            const level = btn.dataset.diagLevel;
            const id = btn.dataset.diagId;
            const textarea = document.getElementById('diag-custom-text');
            const val = textarea.value.trim();
            if (!val) { textarea.style.borderColor = '#ff4444'; return; }
            diagCustomInputs[id] = val;
            if (level === 'problem') diagAnswers.problem.customText = val;
            else diagAnswers.roadblock.customText = val;
            navigateTo(3);
            return;
        }
    });
})();

/* ── Landing ── */
function renderLanding() {
    const c = document.getElementById('diagnostic-system');
    c.innerHTML = '<div class="diag-panel diag-slide-up"><div class="diag-landing">' +
        '<div class="diag-landing-icon"><i class="fa-solid fa-compass"></i></div>' +
        '<h2 class="diag-landing-title">' + (diagQ?.flowTitle || 'Find Out How We Can Help') + '</h2>' +
        '<p class="diag-landing-sub">Answer a few quick questions, and we\'ll identify the biggest opportunities and challenges in your business.</p>' +
        '<button class="diag-btn-start" data-diag-action="start">Start Assessment <i class="fa-solid fa-arrow-right"></i></button>' +
        '</div></div>';
}

/* ── Stage Select ── */
function renderStages() {
    const options = diagQ?.questions?.stage?.options || [];
    const label = diagQ?.questions?.stage?.label || 'Where are you right now?';
    let h = '<div class="diag-panel diag-slide-up">';
    h += progressBar(0);
    h += '<div class="diag-question diag-fade">' + label + '</div>';
    h += renderOptions(options, diagAnswers.stage?.id);
    h += '</div>';
    document.getElementById('diagnostic-system').innerHTML = h;
    bindOptions(selectStage);
}

function selectStage(id) {
    const opt = diagQ.questions.stage.options.find(o => o.id === id);
    if (!opt) return;
    diagAnswers.stage = { id: opt.id, label: opt.label };
    diagAnswers.problem = null; diagAnswers.roadblock = null; diagCustomInputs = {};
    document.querySelectorAll('.diag-option').forEach(el => el.classList.remove('selected'));
    const el = document.querySelector('.diag-option[data-id="' + id + '"]');
    if (el) el.classList.add('selected');
    const problems = opt.problems || [];
    setTimeout(() => {
        if (problems.length === 0) navigateTo(3);
        else navigateTo(1);
    }, 250);
}

/* ── Problem Select ── */
function renderProblems() {
    const stageOpt = diagQ?.questions?.stage?.options?.find(o => o.id === diagAnswers.stage?.id);
    const problems = stageOpt?.problems || [];
    let h = '<div class="diag-panel diag-slide-up">';
    h += progressBar(1);
    h += '<div class="diag-question diag-fade">What\'s your biggest challenge right now?</div>';
    h += renderOptions(problems, diagAnswers.problem?.id);
    h += navRow(true);
    h += '</div>';
    document.getElementById('diagnostic-system').innerHTML = h;
    bindOptions(selectProblem);

    if (diagAnswers.problem) {
        const selectedOpt = problems.find(p => p.id === diagAnswers.problem.id);
        if (selectedOpt && selectedOpt.type === 'text_input') {
            showCustomInput('problem', selectedOpt.id);
        }
    }
}

function selectProblem(id) {
    const stageOpt = diagQ?.questions?.stage?.options?.find(o => o.id === diagAnswers.stage?.id);
    const problem = stageOpt?.problems?.find(p => p.id === id);
    if (!problem) return;
    diagAnswers.problem = { id: problem.id, label: problem.label };
    diagAnswers.roadblock = null;
    document.querySelectorAll('.diag-option').forEach(el => el.classList.remove('selected'));
    const el = document.querySelector('.diag-option[data-id="' + id + '"]');
    if (el) el.classList.add('selected');
    const isText = problem.type === 'text_input';
    const rbs = problem.roadblocks || [];

    const existingInput = document.querySelector('.diag-text-wrap');
    if (existingInput) existingInput.remove();

    setTimeout(() => {
        if (isText) { showCustomInput('problem', id); return; }
        if (rbs.length === 0) navigateTo(3);
        else navigateTo(2);
    }, 250);
}

/* ── Roadblock Select ── */
function renderRoadblocks() {
    const stageOpt = diagQ?.questions?.stage?.options?.find(o => o.id === diagAnswers.stage?.id);
    const problem = stageOpt?.problems?.find(p => p.id === diagAnswers.problem?.id);
    const roadblocks = problem?.roadblocks || [];
    let h = '<div class="diag-panel diag-slide-up">';
    h += progressBar(2);
    h += '<div class="diag-question diag-fade">What\'s the main thing causing that challenge?</div>';
    h += renderOptions(roadblocks, diagAnswers.roadblock?.id);
    h += navRow(true);
    h += '</div>';
    document.getElementById('diagnostic-system').innerHTML = h;
    bindOptions(selectRoadblock);

    if (diagAnswers.roadblock) {
        const selectedOpt = roadblocks.find(r => r.id === diagAnswers.roadblock.id);
        if (selectedOpt && selectedOpt.type === 'text_input') {
            showCustomInput('roadblock', selectedOpt.id);
        }
    }
}

function selectRoadblock(id) {
    const stageOpt = diagQ?.questions?.stage?.options?.find(o => o.id === diagAnswers.stage?.id);
    const problem = stageOpt?.problems?.find(p => p.id === diagAnswers.problem?.id);
    const roadblock = problem?.roadblocks?.find(r => r.id === id);
    if (!roadblock) return;
    diagAnswers.roadblock = { id: roadblock.id, label: roadblock.label };
    document.querySelectorAll('.diag-option').forEach(el => el.classList.remove('selected'));
    const el = document.querySelector('.diag-option[data-id="' + id + '"]');
    if (el) el.classList.add('selected');
    const isText = roadblock.type === 'text_input';

    const existingInput = document.querySelector('.diag-text-wrap');
    if (existingInput) existingInput.remove();

    setTimeout(() => {
        if (isText) showCustomInput('roadblock', id);
        else navigateTo(3);
    }, 250);
}

/* ── Custom Text Input (for "Other" options) ── */
function showCustomInput(level, id) {
    const existingInput = document.querySelector('.diag-text-wrap');
    if (existingInput) existingInput.remove();

    const existing = diagCustomInputs[id] || '';
    const placeholder = level === 'problem'
        ? 'Tell us about your challenge in a bit more detail...'
        : 'Describe your situation...';
    
    const container = document.getElementById('diagnostic-system');
    const panel = container.querySelector('.diag-panel') || container;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'diag-text-wrap diag-fade';
    wrapper.style.marginTop = '16px';
    wrapper.innerHTML = 
        '<textarea class="diag-textarea" id="diag-custom-text" placeholder="' + placeholder + '">' + existing + '</textarea>' +
        '<p class="diag-text-hint">Please describe your situation so we can give you the most relevant guidance.</p>' +
        '<div style="display:flex;justify-content:flex-end;margin-top:12px">' +
        '<button class="diag-btn-next" data-diag-action="custom-submit" data-diag-level="' + level + '" data-diag-id="' + id + '">Continue <i class="fa-solid fa-arrow-right"></i></button>' +
        '</div>';
    
    const navRowEl = panel.querySelector('.diag-nav');
    if (navRowEl) {
        panel.insertBefore(wrapper, navRowEl);
    } else {
        panel.appendChild(wrapper);
    }

    const textEl = document.getElementById('diag-custom-text');
    if (textEl) textEl.focus();
}

/* ── Scenario-Specific Text Question ── */
function renderTextQ() {
    const stageOpt = diagQ?.questions?.stage?.options?.find(o => o.id === diagAnswers.stage?.id);
    const q = stageOpt?.customQuestion;
    if (!q) { navigateTo(4); return; }
    const existing = diagAnswers.customAnswer || '';
    let h = '<div class="diag-panel diag-slide-up">';
    h += progressBar(3);
    h += '<div class="diag-question diag-fade">' + q.label + '</div>';
    h += '<div class="diag-text-wrap diag-fade">';
    h += '<textarea class="diag-textarea" id="diag-text-custom" placeholder="' + (q.placeholder || 'Type your answer...') + '">' + existing + '</textarea>';
    h += '</div><div class="diag-nav">';
    h += '<button class="diag-btn-back" data-diag-action="back"><i class="fa-solid fa-arrow-left"></i> Back</button>';
    h += '<button class="diag-btn-next" data-diag-action="next-text">Next <i class="fa-solid fa-arrow-right"></i></button>';
    h += '</div></div>';
    document.getElementById('diagnostic-system').innerHTML = h;
    document.getElementById('diag-text-custom').focus();
}

/* ── Summary & CTA ── */
function renderSummary() {
    const a = diagAnswers;
    let h = '<div class="diag-panel diag-slide-up">';
    h += progressBar(4);
    h += '<div class="diag-question diag-fade">Your Assessment Is Ready</div>';
    h += '<div class="diag-summary diag-fade">';
    const items = [
        ['Stage', a.stage?.label || ''],
        ['Problem', (a.problem?.label || '') + (a.problem?.customText ? ': ' + a.problem.customText : '')],
        ['Roadblock', (a.roadblock?.label || '') + (a.roadblock?.customText ? ': ' + a.roadblock.customText : '')],
        ['Your Goal', a.customAnswer || '']
    ];
    items.forEach(item => {
        if (!item[1]) return;
        h += '<div class="diag-summary-item"><span class="diag-summary-label">' + item[0] + '</span><span class="diag-summary-value">' + item[1] + '</span></div>';
    });
    h += '</div>';
    
    const escapeHTML = str => str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    const params = new URLSearchParams({
        stage: items[0][1] || '',
        problem: items[1][1] || '',
        roadblock: items[2][1] || '',
        goal: items[3][1] || ''
    });
    const calendlyUrl = 'https://calendly.com/shardulsingh166/30min?' + params.toString();

    window.handleDiagSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.innerHTML = 'Submitting... <i class="fa-solid fa-spinner fa-spin"></i>';

        try {
            await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            window.location.href = calendlyUrl;
        } catch (error) {
            console.error('Submission error:', error);
            window.location.href = calendlyUrl;
        }
    };

    h += '<div class="diag-summary-cta diag-fade">' +
        '<p>Based on your responses, we\'d like to offer a free diagnostic session to help identify your biggest opportunities, bottlenecks, and next steps.</p>' +
        
        '<form action="https://formspree.io/f/xlgkpryn" method="POST" onsubmit="window.handleDiagSubmit(event);">' +
        '<input type="hidden" name="_subject" value="New Diagnostic Assessment Submission!">' +
        '<input type="hidden" name="Stage" value="' + escapeHTML(items[0][1] || 'N/A') + '">' +
        '<input type="hidden" name="Problem" value="' + escapeHTML(items[1][1] || 'N/A') + '">' +
        '<input type="hidden" name="Roadblock" value="' + escapeHTML(items[2][1] || 'N/A') + '">' +
        '<input type="hidden" name="Goal" value="' + escapeHTML(items[3][1] || 'N/A') + '">' +
        
        '<div style="max-width: 400px; margin: 0 auto 20px;">' +
        '<input type="text" name="name" required class="diag-text-input" placeholder="Your Name" style="margin-bottom: 10px; width: 100%; box-sizing: border-box;">' +
        '<input type="email" name="email" required class="diag-text-input" placeholder="Your Work Email" style="width: 100%; box-sizing: border-box;">' +
        '</div>' +
        
        '<button type="submit" class="diag-btn-start">Submit & Book Call <i class="fa-solid fa-arrow-right"></i></button>' +
        '</form>' +
        
        '<div style="margin-top:14px"><button class="diag-btn-back" data-diag-action="back"><i class="fa-solid fa-arrow-left"></i> Review Answers</button></div>' +
        '</div></div>';
    document.getElementById('diagnostic-system').innerHTML = h;
}

initDiagnostic();