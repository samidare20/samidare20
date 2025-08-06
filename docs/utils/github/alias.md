# alias 

## alias에 등록해두면 좋을만한 거 정리

```bash title="bash.bashrc파일에 집어넣기"
alias gs="clear ; git status"
alias c="clear"
alias ga="clear ; git add ."
alias gc='f(){clear ; git commit -m "$@" ; unset -f f;}; f'
alias gp="clear ; git push"
alias gf="clear;  git fetch"
alias gr="f(){clear ; git rebase -i HEAD~%@ unset -f f;};f"
zsh
```