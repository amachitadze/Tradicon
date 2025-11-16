/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import './index.css';
import * as dom from './dom';
import * as state from './state';
import * as ui from './ui';
import * as storage from './storage';
import * as dataManager from './data-manager';
import { setPwaInstallHandlers, setupPwaInstallPrompt, closeModalByEvent } from './utils';
import { View, Language } from './types';
import { addFullscreenEventListeners } from './fullscreen';

// Polyfill for SpeechRecognition and augment global types for non-standard APIs
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
    // Augment the built-in ScreenOrientation interface to include non-standard methods
    interface ScreenOrientation {
        lock(orientation: string): Promise<void>;
        unlock(): void;
    }
}

declare var Cropper: any;
declare var mammoth: any;
declare var pdfjsLib: any;

function bindEventListeners() {
    // Main form submission is delegated to the specific view's logic
    dom.form.addEventListener('submit', ui.handleMainFormSubmit);
    dom.input.addEventListener('input', ui.handleMainFormInput);
    
    // Autocomplete suggestion click
    dom.suggestionsContainer.addEventListener('click', ui.handleSuggestionClick);
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!dom.form.contains(e.target as Node)) {
            dom.suggestionsContainer.hidden = true;
        }
    });

    // Add a single listener for both desktop and mobile language buttons
    document.querySelectorAll('.lang-btn, .mobile-menu-lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = (btn as HTMLElement).dataset.lang as Language;
            if (lang !== state.getCurrentLanguage()) {
                state.setCurrentLanguage(lang);
                storage.saveToStorage('userLanguage', lang); // Save preference

                // Deactivate all lang buttons on both desktop and mobile
                document.querySelectorAll('.lang-btn, .mobile-menu-lang-btn').forEach(b => b.classList.remove('active'));
                
                // Activate the correct ones on both desktop and mobile
                document.querySelectorAll(`.lang-btn[data-lang="${lang}"], .mobile-menu-lang-btn[data-lang="${lang}"]`).forEach(b => b.classList.add('active'));

                ui.updateUIForLanguage(); // Update static UI immediately

                // If a search result is currently displayed, re-fetch it in the new language.
                if (state.getLastSearchedTerm() && (state.getCurrentView() === 'conjugator' || state.getCurrentView() === 'dictionary')) {
                    ui.refetchLastTermInNewLanguage();
                }
            }
        });
    });

    dom.hamburgerBtn.addEventListener('click', () => ui.toggleMobileMenu());
    dom.mobileMenuOverlay.addEventListener('click', () => ui.toggleMobileMenu());

    // Combine all view-switching buttons into one listener
    document.querySelectorAll('.nav-btn, .bottom-nav-btn, #footer-about-btn, .mobile-menu-link[data-view]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = (e.currentTarget as HTMLElement).dataset.view as View;
            ui.setView(view); // setView already handles closing the menu
        });
    });

    // Add handlers for non-view-switching mobile menu buttons
    document.getElementById('mobile-menu-export')?.addEventListener('click', () => {
        dataManager.exportUserData();
        ui.toggleMobileMenu(true); // Close menu after action
    });
    document.getElementById('mobile-menu-import')?.addEventListener('click', () => {
        ui.handleShowImportOptions();
        ui.toggleMobileMenu(true); // Close menu after action
    });


    // --- MODAL & FILE UPLOAD LISTENERS (DELEGATED) ---
    document.body.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        // Handle all modal close actions
        if (target.matches('.modal-close, #alert-modal-close-btn') || (target.matches('.modal-overlay') && e.target === target)) {
            closeModalByEvent({ currentTarget: target } as unknown as Event);
            return;
        }
    });

    // File inputs (these are 'change' events, not 'click', so they are handled separately)
    dom.imageUploadGalleryInput.addEventListener('change', ui.handleImageUploadEvent);
    dom.imageUploadCameraInput.addEventListener('change', ui.handleImageUploadEvent);
    dom.documentUploadInput.addEventListener('change', ui.handleDocumentUploadEvent);

    // Delegated event listeners for dynamic content
    ui.addDelegatedEventListeners();
    addFullscreenEventListeners(); // Setup listeners for fullscreen overlay

    // Listen for API usage changes to update the global UI
    document.addEventListener('apiUsageChanged', () => {
        ui.updateGlobalUI();
    });
}

function init() {
    bindEventListeners();
    
    // The vite-plugin-pwa with 'autoUpdate' registerType will handle service worker registration automatically.
    // The manual registration code has been removed to prevent conflicts.
    
    setupPwaInstallPrompt();
    setPwaInstallHandlers();

    // Initial setup
    const savedLang = storage.getFromStorage<Language | null>('userLanguage', null);
    const initialLang = savedLang || (navigator.language.startsWith('ka') ? 'ka' : 'es') as Language;
    state.setCurrentLanguage(initialLang);
    document.querySelectorAll(`.lang-btn[data-lang="${initialLang}"], .mobile-menu-lang-btn[data-lang="${initialLang}"]`).forEach(b => b.classList.add('active'));
    
    ui.setView(state.getCurrentView()); // Initial render with default view
}

document.addEventListener('DOMContentLoaded', init);