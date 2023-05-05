export function genMongoToken(database) {
  return (
    process.env.MONGODB_TOKEN_PREFIX +
    database +
    process.env.MONGODB_TOKEN_SUFFIX
  );
}
