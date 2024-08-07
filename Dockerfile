###################
# BUILD
###################

FROM node:20-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node ./yarn.lock ./
COPY --chown=node:node ./package.json ./

# Copy all workspace files
COPY --chown=node:node ./api-spec ./api-spec
COPY --chown=node:node ./backend ./backend

RUN yarn install --frozen-lockfile --only=production && yarn cache clean --force

# Install app dependencies
RUN yarn build

# Use the node user from the image (instead of the root user)
USER node

###################
# PRODUCTION
###################

FROM node:20-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

COPY --chown=node:node --from=build /usr/src/app/api-spec/dist ./api-spec/dist
COPY --chown=node:node --from=build /usr/src/app/api-spec/package.json ./api-spec/package.json

COPY --chown=node:node --from=build /usr/src/app/backend/dist ./backend/dist

# Start the server using the production build
CMD node backend/dist/main.js
