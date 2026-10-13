# Этап сборки: компилятор нужен только здесь и не попадёт в итоговый образ.
FROM golang:1.22-alpine AS builder
WORKDIR /build

# Зависимости отдельно от кода: изменение main.go не сбрасывает их кэш.
COPY go.mod go.sum ./
RUN go mod download
COPY . .

# Статический бинарник работает без glibc; -s -w уменьшают его размер.
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /out/app ./main.go

# В runtime нет shell и компилятора; nonroot исключает запуск от root.
FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /app
COPY --from=builder /out/app /app/app
EXPOSE 8080
# JSON-форма запускает бинарник напрямую, без отсутствующей в образе оболочки.
ENTRYPOINT ["/app/app"]
