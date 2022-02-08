export function textHelper(text) {
    return text.split(/\r?\n/).map((fragment, i) => <p key={i} className="text" >{fragment}</p>);
}