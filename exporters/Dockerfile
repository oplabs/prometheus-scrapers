FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

COPY package.json ${LAMBDA_TASK_ROOT}
COPY src ${LAMBDA_TASK_ROOT}/

RUN npm install

CMD [ "src/lambda.handler" ]
