    // Helper to set a cookie
    function setCookie(name, value, seconds) {
        document.cookie = `${name}=${value}; max-age=${seconds}; path=/`;
    }
    // Helper to get a cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    const token = getCookie('authToken');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const labeluser = document.querySelector('label[for="username"]');
    const labelpass = document.querySelector('label[for="password"]');
    const formlogin = document.querySelector('.login-form form');

    username.addEventListener('focus', () => {
        labeluser.classList.add('active');
    });

    username.addEventListener('blur', () => {
        if (!username.value) {
            labeluser.classList.remove('active');
        }
    });

    password.addEventListener('focus', () => {
        labelpass.classList.add('active');
    });

    password.addEventListener('blur', () => {
        if (!password.value) {
            labelpass.classList.remove('active');
        }
    });

    formlogin.addEventListener('submit', async (event) => {
        event.preventDefault();
        document.querySelector('.spinner1').style.display = 'flex';
        const usernameValue = username.value;
        const passwordValue = password.value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: usernameValue, password: passwordValue })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            setCookie('authToken', data.token, 172800);
            window.location.reload();
        } catch (error) {
            document.getElementById('warni').textContent = 'Login failed. Please try again.';
            console.error('Error during login:', error);
        } finally {
            document.querySelector('.spinner1').style.display = 'none';
        }
    });

    const form = document.querySelector('form');
    const orderResults = document.getElementById('order-results');
    const orderWarn = document.getElementById('order-warn');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        document.querySelector('.spinner1').style.display = 'flex';
        orderWarn.textContent = 'Please wait...';
        orderResults.innerHTML = '';

        const startId = parseInt(form.elements['starting'].value);
        const endId = parseInt(form.elements['ending'].value);
        const token = getCookie('authToken');
        if (!token) {
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = `<span style="color:red;">Token Expired 
  <button onclick="document.querySelector('.login-main').style.display = 'flex';" class="login-again">
    Login Again.
  </button>
</span>`;

            orderResults.appendChild(errorDiv);
            document.querySelector('.spinner1').style.display = 'none';
            return;
        }
        if (isNaN(startId) || isNaN(endId) || startId > endId) {
            orderWarn.textContent = 'Invalid range!';
            document.querySelector('.spinner1').style.display = 'none';
            return;
        }

        for (let orderId = startId; orderId <= endId; orderId++) {
            orderWarn.textContent = `Fetching order ${orderId}...`;
            document.querySelector('.spinner1').style.display = 'flex';

            try {
                const response = await fetch("/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ orderId })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                const div = document.createElement('div');
                div.innerHTML = data.info;
                orderResults.appendChild(div);
            } catch (error) {
                const errorDiv = document.createElement('div');

                errorDiv.innerHTML = `<span style="color:red;">Error fetching orderg ${orderId}</span>`;
                orderResults.appendChild(errorDiv);
                console.error('Error fetching order:', error);
            }

            document.querySelector('.spinner1').style.display = 'none';
            await new Promise(resolve => setTimeout(resolve, 2000)); 
        }

        orderWarn.textContent = 'All results processed.';
        document.querySelector('.spinner1').style.display = 'none';
    });

    document.querySelector('.order-res-header button').addEventListener('click', async function () {
        const main = document.querySelector('.main');
        const resHeaders = document.querySelector(".order-res-header");
        const removeButtons = document.querySelectorAll('.remove-item');
        const multipleItems = document.querySelector('.multi');
        await main.classList.add('none');
        await resHeaders.classList.add('none');
        await orderWarn.classList.add('none');
        await removeButtons.forEach(button => {
            button.classList.add('none');
        });
        window.print();
        setTimeout(() => {
            main.classList.remove('none');
            resHeaders.classList.remove('none');
            orderWarn.classList.remove('none');
            removeButtons.forEach(button => {
                button.classList.remove('none');
            });
        }, 500)
    });
    function removeItemFromList(event) {
        const item = event.target.closest('.sepreate');
        if (item) {
            item.remove();
        }
    }