import Resources from '../src/resources';

describe('#Resources', () => {
  describe('#parse', () => {
    it('parses empty resources', () => {
      const resources = Resources.parse('', 'checksum');
      expect(resources.checksum).toEqual('checksum');
      expect(resources.js).toEqual(new Map());
      expect(resources.resources).toEqual(new Map());
    });

    it('parses one resource', () => {
      const resources = Resources.parse('foo application/javascript\ncontent', 'checksum');
      expect(resources.checksum).toEqual('checksum');
      expect(resources.js).toEqual(new Map([['foo', 'content']]));
      expect(resources.resources).toEqual(
        new Map([['foo', { contentType: 'application/javascript', data: 'content' }]]),
      );
    });

    it('parses two resources', () => {
      const resources = Resources.parse(
        ['foo application/javascript\ncontent1', 'pixel.png image/png;base64\ncontent2'].join(
          '\n\n',
        ),
        'checksum',
      );
      expect(resources.checksum).toEqual('checksum');
      expect(resources.js).toEqual(new Map([['foo', 'content1']]));
      expect(resources.resources).toEqual(
        new Map([
          ['foo', { contentType: 'application/javascript', data: 'content1' }],
          ['pixel.png', { contentType: 'image/png;base64', data: 'content2' }],
        ]),
      );
    });
  });
});
