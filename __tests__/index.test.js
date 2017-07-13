import { getPinnedReference, getPackageDependencies } from '../index';

describe('Chapter 2', () => {
  describe('getPinnedReference', () => {
    it('should work with version range', async () => {
      expect.assertions(1);
      const pinnedReference = await getPinnedReference({
        name: 'react',
        reference: '~15.3.0',
      });
      expect(pinnedReference).toEqual({ name: 'react', reference: '15.3.2' });
    });

    it('should work with pinned version', async () => {
      expect.assertions(1);
      const pinnedReference = await getPinnedReference({
        name: 'react',
        reference: '15.3.0',
      });
      expect(pinnedReference).toEqual({ name: 'react', reference: '15.3.0' });
    });

    it('should work with path', async () => {
      expect.assertions(1);
      const pinnedReference = await getPinnedReference({
        name: 'react',
        reference: '/tmp/react-15.3.2.tar.gz',
      });
      expect(pinnedReference).toEqual({
        name: 'react',
        reference: '/tmp/react-15.3.2.tar.gz',
      });
    });
  });
});

describe('Chapter 3', () => {
  describe('getPackageDependencies', () => {
    it('should resolve dependencies of a package', async () => {
      expect.assertions(1);
      const dependencies = await getPackageDependencies({
        name: 'react',
        reference: '15.6.1',
      });
      expect(dependencies).toEqual([
        { name: 'create-react-class', reference: '^15.6.0' },
        { name: 'fbjs', reference: '^0.8.9' },
        { name: 'loose-envify', reference: '^1.1.0' },
        { name: 'object-assign', reference: '^4.1.0' },
        { name: 'prop-types', reference: '^15.5.10' },
      ]);
    });
  });
});
