import {
	assert
} from '@open-wc/testing';

import {
	action,
	reduce,
	type
} from '../lib/reduce';

suite('reduce', () => {
	suite('action', () => {
		test('basic', () => {
			const doit = action('DOIT');
			assert.isUndefined(doit().payload, 'Payload is undefined');
			assert.isUndefined(doit().meta, 'Meta is undefined');
			assert.equal(doit.toString(), 'DOIT', 'Creator toString() equals type');
			assert.equal(doit('ASD').type, 'DOIT', 'Action type');
		});

		test('payload', () => {
			const ACT = 'SOME_ACT',
				act = action(ACT, resolve => p => resolve(p));
			assert.equal(act, ACT);
			assert.equal(act('payload').payload, 'payload');
		});

		test('meta', () => {
			const ACT = 'OTHER_ACT',
				act = action(ACT, resolve => m => resolve(undefined, m));
			assert.equal(act, ACT);
			assert.equal(act('meta').meta, 'meta');
			assert.isUndefined(act('meta').payload);
		});
	});

	suite('type', () => {
		test('action', () => {
			assert.equal(type(action('TYPE')()), 'TYPE');
		});
		test('toString', () => {
			assert.equal(type({
				toString() {
					return 'TYPE';
				}
			}), 'TYPE');
		});
	});

	suite('reduce', () => {
		test('handle action', () => {
			const doit = action('doit'),
				reducer = reduce({}, handle => [
					handle(doit, () => ({
						doneit: true
					}))
				]);
			assert.isUndefined(reducer(undefined, action('something')).doneit);
			assert.isTrue(reducer({ doneit: false }, doit()).doneit);
		});

	});
});
