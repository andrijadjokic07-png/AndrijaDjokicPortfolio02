const showStatus = (container, message, role, className) => {
    const hadFocus = container.contains(document.activeElement);

    const text = document.createElement('p');
    text.className = 'statustext';
    text.textContent = message;

    const status = document.createElement('div');
    status.className = className ? `status ${className}` : 'status';
    status.setAttribute('role', role);
    status.append(text);

    container.tabIndex = -1;
    container.replaceChildren(status);

    if (hadFocus) {
        container.focus();
    }

    return status;
};

export const showInfo = (container, message) => showStatus(container, message, 'status');

export const clearStatus = (container) => container.replaceChildren();

export const showError = (container, message, onRetry) => {
    const status = showStatus(container, message, 'alert', 'statuserror');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'retrybutton';
    button.textContent = 'Try again';
    button.addEventListener('click', onRetry, { once: true });

    status.append(button);

    if (document.activeElement === container) {
        button.focus();
    }
};