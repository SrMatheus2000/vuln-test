bind => {
    bindContributionProvider(bind, ConnectionContainerModule);
    bindContributionProvider(bind, MessagingService.Contribution);
    bind(MessagingContribution).toDynamicValue(({ container }) => {
        const child = container.createChild();
        child.bind(MessagingContainer).toConstantValue(container);
        child.bind(MessagingContribution).toSelf();
        return child.get(MessagingContribution);
    }).inSingletonScope();
    bind(BackendApplicationContribution).toService(MessagingContribution);
}