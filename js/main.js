const SUPABASE_URL = 'https://rqluecojhplvfiytybty.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxbHVlY29qaHBsdmZpeXR5YnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjM5ODksImV4cCI6MjA5NDQzOTk4OX0.qmZxISA7qnGnnLT7mCyJc7yOCJVsDywzzk21lt9jIPY'

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function submitEmail(email, buttonEl) {
    buttonEl.disabled = true
    buttonEl.textContent = 'Joining...'

    const { error } = await supabaseClient
        .from('waitlist')
        .insert({ email })

    if (error && error.code === '23505') {
        buttonEl.textContent = "You're already on the list!"
    } else if (error) {
        buttonEl.textContent = 'Something went wrong'
        buttonEl.disabled = false
    } else {
        buttonEl.textContent = "You're in! ✨"
    }
}

function attachForm(formId) {
    const form = document.getElementById(formId)
    if (!form) return
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = form.querySelector('input[type="email"]').value
        const button = form.querySelector('button[type="submit"]')
        submitEmail(email, button)
    })
}

attachForm('form-hero')
attachForm('form-cta')
