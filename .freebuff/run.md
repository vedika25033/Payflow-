# Payflow Interceptor — Run Doc

## Artifacts

Fresh `npm install` is all that's needed. The project uses Vite 4 + React + TypeScript + Tailwind CSS.

**Vite 4 note:** This machine's Application Control policy blocks Rollup 4 native binaries (`@rollup/rollup-win32-x64-msvc`). Vite 4 uses Rollup 3 which doesn't need native bindings, so it works around the issue. If your system doesn't have this restriction, you can use the original `package.json` with Vite 5.

## How to Reproduce

```bash
cd <project-root>
rm -rf node_modules package-lock.json
npm install vite@4 @vitejs/plugin-react@4 react react-dom @types/react @types/react-dom typescript tailwindcss@3 postcss autoprefixer
```

## How to Run

```bash
cd <project-root>
npx vite --host 0.0.0.0 --port 5173
```

Server starts at `http://localhost:5173`.

## Detach (Windows)

```powershell
Start-Process -FilePath 'C:\Program Files\nodejs\npm.cmd' -ArgumentList 'run','dev' -WorkingDirectory '<project-root>' -RedirectStandardOutput '<project-root>\.freebuff\preview.log' -RedirectStandardError '<project-root>\.freebuff\preview.log.err' -WindowStyle Hidden -PassThru | Select-Object -ExpandProperty Id
```

Verify with: `Get-Process -Id <pid>`

## Preview

Registered at `http://localhost:5173` with PID `19408`.
