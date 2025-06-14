// App State
        let currentPage = 'home';
        let timerRunning = false;
        let timerSeconds = 1500; // 25 minutes
        let timerInterval;
        let currentMood = 'great';

        // Buddy messages based on different situations
        const buddyMessages = {
            morning: [
                "Good morning! 🌅 Ready to start the day mindfully?",
                "Hey early bird! Let's make today awesome without constant scrolling",
                "Morning sunshine! Your phone can wait - let's focus on you first ☀️"
            ],
            achievement: [
                "Wow! You're absolutely crushing it! 🎉",
                "I'm so proud of your progress! Keep it up! 💪",
                "You're becoming a digital wellness master! 🧘‍♀️"
            ],
            encouragement: [
                "Having a tough day? Remember, small steps count too! 💙",
                "It's okay to stumble - what matters is getting back up! 🌟",
                "You're stronger than your habits. I believe in you! 💪"
            ],
            celebration: [
                "YESSS! Look at you go! Time for a happy dance! 💃",
                "You just leveled up in life! Amazing work! ⭐",
                "Someone's on fire today! Keep that energy! 🔥"
            ]
        };

        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            updateBuddyMessage();
            updateStats();
            createFloatingElements();
        });

        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Remove active class from all nav tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Add active class to clicked nav tab
            event.target.classList.add('active');
            
            currentPage = pageId;
        }

        function selectMood(emoji) {
            document.querySelectorAll('.mood-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            event.target.classList.add('selected');
            currentMood = event.target.dataset.mood;
            
            // Update buddy message based on mood
            setTimeout(() => {
                updateBuddyMessage();
                createHearts();
            }, 500);
        }

        function updateBuddyMessage() {
            const hour = new Date().getHours();
            let messageCategory;
            
            if (hour < 12) {
                messageCategory = 'morning';
            } else if (currentMood === 'stressed') {
                messageCategory = 'encouragement';
            } else if (currentMood === 'amazing') {
                messageCategory = 'celebration';
            } else {
                messageCategory = 'achievement';
            }
            
            const messages = buddyMessages[messageCategory];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            const messageEl = document.getElementById('buddyMessage');
            messageEl.style.opacity = '0';
            
            setTimeout(() => {
                messageEl.textContent = randomMessage;
                messageEl.style.opacity = '1';
            }, 300);
        }

        function startChallenge(challengeType) {
            const challenges = {
                'phone-drawer': "Great choice! Put your phone in a drawer now. I'll send you encouraging thoughts! 📱➡️📦",
                'digital-sunset': "Perfect timing! Start winding down those screens. Your sleep will thank you! 🌙",
                'mindful-morning': "Amazing! Tomorrow morning, leave your phone aside and breathe in the day! ☀️",
                'social-fast': "You're brave! Social media will be there later. Let's focus on real life! 🌍"
            };
            
            const buddyMessage = document.getElementById('buddyMessage');
            buddyMessage.textContent = challenges[challengeType];
            
            // Switch to home page to show the message
            showPage('home');
            document.querySelector('.nav-tab').classList.add('active');
            
            // Create celebration effect
            createHearts();
            
            // Update XP (simulate)
            setTimeout(() => {
                updateStats();
            }, 1000);
        }

        function setTimer(minutes) {
            timerSeconds = minutes * 60;
            updateTimerDisplay();
            
            // Update button states
            document.querySelectorAll('.timer-controls .btn').forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-secondary');
            });
            
            event.target.classList.remove('btn-secondary');
            event.target.classList.add('btn-primary');
        }

        function toggleTimer() {
            const btn = document.getElementById('timerBtn');
            
            if (!timerRunning) {
                startTimer();
                btn.textContent = 'Pause';
                btn.style.background = 'linear-gradient(135deg, #ff6b6b, #feca57)';
            } else {
                pauseTimer();
                btn.textContent = 'Resume';
                btn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            }
        }

        function startTimer() {
            timerRunning = true;
            timerInterval = setInterval(() => {
                timerSeconds--;
                updateTimerDisplay();
                
                if (timerSeconds <= 0) {
                    timerComplete();
                }
            }, 1000);
        }

        function pauseTimer() {
            timerRunning = false;
            clearInterval(timerInterval);
        }

        function updateTimerDisplay() {
            const minutes = Math.floor(timerSeconds / 60);
            const seconds = timerSeconds % 60;
            const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            document.getElementById('timerDisplay').textContent = display;
        }

        function timerComplete() {
            timerRunning = false;
            clearInterval(timerInterval);
            
            // Reset timer button
            const btn = document.getElementById('timerBtn');
            btn.textContent = 'Start Focus';
            btn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            
            // Show celebration
            document.getElementById('buddyMessage').textContent = "🎉 Amazing focus session! You're getting stronger every day!";
            createHearts();
            
            // Reset timer
            timerSeconds = 1500;
            updateTimerDisplay();
        }

        function updateStats() {
            // Simulate dynamic stats
            const pickups = Math.floor(Math.random() * 20) + 35;
            const hours = Math.floor(Math.random() * 3) + 2;
            const minutes = Math.floor(Math.random() * 60);
            
            document.getElementById('todayPickups').textContent = pickups;
            document.getElementById('screenTime').textContent = `${hours}h ${minutes}m`;
        }

        function createHearts() {
            const heartsContainer = document.getElementById('hearts');
            
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.className = 'heart';
                    heart.textContent = '💖';
                    heart.style.left = Math.random() * 100 + '%';
                    heart.style.animationDelay = Math.random() * 2 + 's';
                    
                    heartsContainer.appendChild(heart);
                    
                    setTimeout(() => {
                        heart.remove();
                    }, 3000);
                }, i * 200);
            }
        }

        function createFloatingElements() {
            // Create subtle floating elements for ambience
            setInterval(() => {
                if (Math.random() < 0.3) { // 30% chance every interval
                    const element = document.createElement('div');
                    element.style.position = 'fixed';
                    element.style.fontSize = '0.8rem';
                    element.style.color = 'rgba(255,255,255,0.6)';
                    element.style.pointerEvents = 'none';
                    element.style.zIndex = '5';
                    element.textContent = ['✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 4)];
                    element.style.left = Math.random() * 100 + '%';
                    element.style.top = '100%';
                    element.style.animation = 'floatUp 4s ease-out forwards';
                    
                    document.body.appendChild(element);
                    
                    setTimeout(() => element.remove(), 4000);
                }
            }, 5000);
        }

        // Auto-update buddy messages periodically
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance
                updateBuddyMessage();
            }
        }, 30000); // Every 30 seconds

        // Simulate real-time updates
        setInterval(updateStats, 60000); // Update stats every minute