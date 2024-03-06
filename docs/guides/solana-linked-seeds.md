# Solana linked seeds

As discussed in Solana Extension - Data Types - Seeds, we can create PDA accounts. When the seed is a static string,
everything is handled for you. But, sometimes, we need dynamic seeds that will be set at runtime.

By default, any dynamic seed will be added as a parameter to the client library. In other cases, we want to specify that
a given input or signer must be used as the value for this dynamic seed, or we want to receive a seed value in the stub.
For these cases, we use the seeds property. For example:

The seeds is a key-value pair, where the key is the name of the seed define in the data structure, and the value is the
name of the signer or input define in the method. This way, we can link inputs or signers to seeds.

The above example shows that the signer named client will be set for the seed named signer, and the input m_index will
be set for the seed named index.