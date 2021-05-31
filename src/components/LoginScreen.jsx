import React from 'react'

const LoginScreen = () => {

    const handleQuit = (e) => {
        if (e.target.className === 'loginScreen__curtain') {
            e.target.parentElement.classList.toggle('none')
        }
    }

    const handleGoRegister = () => {
        document.querySelector('.loginScreen').classList.toggle('none');
        document.querySelector('.registerScreen').classList.toggle('none');
    }

    return ( 
        <div className="loginScreen none" onClick={handleQuit}>
            <div className="loginScreen__curtain">
                <div className="loginScreen__panel">
                    <h2 className="loginScreen__title">Logowanie</h2>
                    <form className="loginScreen__form">
                        <input type="text" className="loginScreen__input" placeholder="login"/>
                        <input type="text" className="loginScreen__input" placeholder="hasło"/>
                        <input type="submit" className="loginScreen__submit" value="Zaloguj"/>
                    </form>
                    <div className="loginScreen__help">
                        <p className="loginScreen__text link">Zapomniałeś hasła?</p>
                        <p className="loginScreen__text">Nie masz jeszcze konta? <span className="loginScreen__goRegister" onClick={handleGoRegister}>Zarejestruj się</span> już teraz!</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default LoginScreen;