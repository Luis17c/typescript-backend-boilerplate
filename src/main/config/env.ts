const e = process.env

export const env = {
    ambient: e.AMBIENT ?? "dev",
    port: e.PORT ?? "8080",
    dbHost: e.DB_HOST ?? 'localhost',
    dbPort: e.DB_PORT ?? "5432",
    dbUrl: e.DB_URL ?? "",
    dbUser: e.DB_USER ?? "",
    dbDatabase: e.DB_DATABASE ?? "",
    dbPassword: e.DB_PASSWORD ?? "",
    jwtSecret: e.JWT_SECRET ?? 'd87s6a7h7weh5tw5t8w54',
    jwtExpiresIn: e.JWT_EXPIRES_IN ?? "1d",
    storageDriver: e.STORAGE_DRIVER ?? 'disk',
    bucketName: e.BUCKET_NAME ?? "tmp"
}   