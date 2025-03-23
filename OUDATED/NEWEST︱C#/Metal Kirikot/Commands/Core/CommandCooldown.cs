
using System;

namespace MetalKirikot.Commands.Core {

    public struct CommandCooldown {

        public CommandCooldownBucketType BucketType { get; init; }
        public Double Milliseconds => _cooldownValue;
        public TimeSpan Span => TimeSpan.FromMilliseconds(_cooldownValue);

        private Double _cooldownValue;

        public CommandCooldown(Double milliseconds, CommandCooldownBucketType bucketType) => (_cooldownValue, BucketType) = (milliseconds, bucketType);
        public CommandCooldown(TimeSpan span, CommandCooldownBucketType bucketType) : this (span.TotalMilliseconds, bucketType) { }
    }
}