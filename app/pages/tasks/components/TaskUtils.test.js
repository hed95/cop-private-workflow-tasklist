import TaskUtils from "./TaskUtils";

describe('TaskUtils', () => {
    const taskUtils = new TaskUtils();
    const data = [
      {
        'businessKey': 'DEV-20200120-1221',
        'process-definition': {
          'category': 'B'
        },
        task: {
          name: 'test1',
          priority: 50 // test what we expect to be  Low: 50
        }
      },
      {
        'process-definition': {
          'category': 'a'
        },
        'businessKey': 'DEV-20200220-1222', // test group by key can group more than one item
        task: {
          name: 'test2',
          priority: 1000 // test in case something is set to 1000, it returns High
        }
      },
      {
        'process-definition': {
          'category': 'a'
        },
        'businessKey': 'DEV-20200420-1224', 
        task: {
          name: 'test2'
          // test if there is no priority set it defaults to High
        }
      }, 
      {
        'process-definition': {
          'category': 'a'
        },
        'businessKey': 'DEV-20200220-1222', // test group by key can group more than one item
        task: {
          name: 'test4',
          priority: 150 // test what we expect to be as High: 150
        }
      },
      {
        'process-definition': {
          'category': 'a'
        },
        'businessKey': 'DEV-20200320-1223',
        task: {
          name: 'test3',
          priority: 250 // test in case something is set to 250, it returns High
      }
    }];

    it('returns the expected references', () => {
      const result = taskUtils.applyGrouping('reference', data);
      const keys = Object.keys(result);
      expect(keys).toContainEqual('DEV-20200120-1221');
      expect(keys).toContainEqual('DEV-20200220-1222');
      expect(keys).toContainEqual('DEV-20200320-1223');
      expect(keys).toContainEqual('DEV-20200420-1224');
    });

    it('groups by reference', () => {
      const result = taskUtils.applyGrouping('reference', data);
      expect(result["DEV-20200220-1222"]).toHaveLength(2);
      expect(result["DEV-20200320-1223"]).toHaveLength(1);
      expect(result["DEV-20200120-1221"]).toHaveLength(1);
      expect(result["DEV-20200420-1224"]).toHaveLength(1);
    })

    it('orders priority groups correctly', () => {
      const result = taskUtils.applyGrouping('priority', data);
      const keys = Object.keys(result);
      expect(keys[0]).toEqual('High');
      expect(keys[1]).toEqual('Medium');
      expect(keys[2]).toEqual('Low');
    });

    it('groups by priority', () => {
      const result = taskUtils.applyGrouping('priority', data);
      expect(result.High).toHaveLength(4);
      expect(result.Medium).toBeUndefined();
      expect(result.Low).toHaveLength(1);
    })

    it('returns the expected categories', () => {
      const result = taskUtils.applyGrouping('category', data);
      const keys = Object.keys(result);
      expect(keys).toContainEqual('a');
      expect(keys).toContainEqual('B');
    });

  it('groups by categories', () => {
    const result = taskUtils.applyGrouping('category', data);
    expect(result.a).toHaveLength(4);
    expect(result.B).toHaveLength(1);
  })
})
